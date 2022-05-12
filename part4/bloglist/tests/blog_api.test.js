const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('/api/blogs tests', () => {

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  describe('when one valid user has been created', () => {

    beforeEach(async () => {
      await User.deleteMany({})

      const newUser = {
        username: 'TestUser',
        name: 'John Doe',
        password: 'test',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    })

    test('a valid blog cannot be created without user token', async () => {
      const newBlog = {
        title: 'New Fancy Blog',
        author: 'Yours truly',
        url: 'www.blogs.com',
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)
    })

    test('a valid blog can be created with the user', async () => {
      const response = await api
        .post('/api/login')
        .send({ username: 'TestUser', password: 'test' })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const newBlog = {
        title: 'New Fancy Blog',
        author: 'Yours truly',
        url: 'www.blogs.com',
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ Authorization: 'bearer ' + response.body.token })
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(blog => blog.title)
      expect(titles).toContain(
        'New Fancy Blog'
      )
    })

    test('a valid blog without likes has 0 likes when created with the user', async () => {
      const response = await api
        .post('/api/login')
        .send({ username: 'TestUser', password: 'test' })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const newBlog = {
        title: 'New Fancy Blog',
        author: 'Yours truly',
        url: 'www.blogs.com',
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ Authorization: 'bearer ' + response.body.token })
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd[(blogsAtEnd.length - 1)].likes).toBe(0)
    })

    test('a invalid blog without url cannot be added when created with the user => returns 400', async () => {
      const response = await api
        .post('/api/login')
        .send({ username: 'TestUser', password: 'test' })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const newBlog = {
        title: 'New Fancy Blog',
        author: 'Yours truly',
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ Authorization: 'bearer ' + response.body.token })
        .expect(400)
        .expect('Content-Type', /application\/json/)

    })

    test('a blog can be deleted by the creater', async () => {
      const userResponse = await api
        .post('/api/login')
        .send({ username: 'TestUser', password: 'test' })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const newBlog = {
        title: 'New Fancy Blog',
        author: 'Yours truly',
        url: 'www.blogs.com',
      }

      const blogResponse = await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ Authorization: 'bearer ' + userResponse.body.token })
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogs = await helper.blogsInDb()
      expect(blogs).toHaveLength(3)

      await api
        .delete(`/api/blogs/${blogResponse.body.id}`)
        .set({ Authorization: 'bearer ' + userResponse.body.token })
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(2)
    })

    test('a blog can be updated', async () => {
      const userResponse = await api
        .post('/api/login')
        .send({ username: 'TestUser', password: 'test' })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const newBlog = {
        title: 'New Fancy Blog',
        author: 'Yours truly',
        url: 'www.blogs.com',
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ Authorization: 'bearer ' + userResponse.body.token })
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd[(blogsAtEnd.length - 1)].likes).toBe(0)

      const newBlogUpdate = {
        title: 'New Fancy Blog',
        author: 'Yours truly',
        url: 'www.blogs.com',
        likes: 14,
      }

      await api
        .put(`/api/blogs/${blogsAtEnd[(blogsAtEnd.length - 1)].id}`)
        .send(newBlogUpdate)
        .set({ Authorization: 'bearer ' + userResponse.body.token })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEndAfterUpdate = await helper.blogsInDb()
      expect(blogsAtEndAfterUpdate[(blogsAtEndAfterUpdate.length - 1)].likes).toBe(14)
    })
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

describe('/api/users tests', () => {

  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('invalid user cannot be created and returns correct error', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ml',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username and password need to be at least 3 characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})