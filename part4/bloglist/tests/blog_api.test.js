const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const app = require('../app')
const api = supertest(app)

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

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'New Fancy Blog',
      author: 'Yours truly',
      url: 'www.blogs.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain(
      'New Fancy Blog'
    )
  })

  test('a new blog without likes has 0 likes', async () => {
    const newBlog = {
      title: 'New Fancy Blog',
      author: 'Yours truly',
      url: 'www.blogs.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd[(blogsAtEnd.length - 1)].likes).toBe(0)
  })

  test('a blog without url cannot be added => returns 400', async () => {
    const newBlog = {
      title: 'New Fancy Blog',
      author: 'Yours truly',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

  })

  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(blog => blog.title)

    expect(titles).not.toContain(blogToDelete.title)
  })

  test('a blog can be updated', async () => {
    const newBlog = {
      title: 'New Fancy Blog',
      author: 'Yours truly',
      url: 'www.blogs.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
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
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEndAfterUpdate = await helper.blogsInDb()
    expect(blogsAtEndAfterUpdate[(blogsAtEndAfterUpdate.length - 1)].likes).toBe(14)
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})