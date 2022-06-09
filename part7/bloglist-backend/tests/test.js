const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
  ]

  const listWith3Blogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 2,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 8,
      __v: 0,
    },
  ]

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWith3Blogs)
    expect(result).toBe(15)
  })
})

describe('favoriteBlog', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
  ]

  const listWith3Blogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Blog 1',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Blog 2',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 25,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Blog 3',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 8,
      __v: 0,
    },
  ]

  test('of empty list is empty', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual({})
  })

  test('of list with one entry is blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual({
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    })
  })

  test('of list with many entries is blog with most likes', () => {
    const result = listHelper.favoriteBlog(listWith3Blogs)
    expect(result).toEqual({
      _id: '5a422aa71b54a676234d17f8',
      title: 'Blog 2',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 25,
      __v: 0,
    })
  })
})

describe('most occuring author', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Martin',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
  ]

  const listWithmanyBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Blog 1',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Blog 2',
      author: 'Paul',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 25,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Blog 3',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 8,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Blog 4',
      author: 'Paul',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 8,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Blog 5',
      author: 'Paul',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 8,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Blog 6',
      author: 'Martin',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 8,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Blog 7',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 8,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Blog 8',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 8,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Blog 9',
      author: 'Martin',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 8,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Blog 10',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 8,
      __v: 0,
    },
  ]

  test('of empty list is empty', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual({})
  })

  test('of list with one entry is author', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({ author: 'Martin', blogs: 1 })
  })

  test('of list with many entries is author with most blogs', () => {
    const result = listHelper.mostBlogs(listWithmanyBlogs)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 5 })
  })
})

describe('most liked author', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Martin',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
  ]

  const listWithmanyBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Blog 1',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Blog 2',
      author: 'Paul',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 25,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Blog 3',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 8,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Blog 4',
      author: 'Paul',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 8,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Blog 5',
      author: 'Paul',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 8,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Blog 6',
      author: 'Martin',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 8,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Blog 7',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 8,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Blog 8',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 8,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Blog 9',
      author: 'Martin',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 8,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Blog 10',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 8,
      __v: 0,
    },
  ]

  test('of empty list is empty', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual({})
  })

  test('of list with one entry is author', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual({ author: 'Martin', likes: 5 })
  })

  test('of list with many entries is author with most blogs', () => {
    const result = listHelper.mostLikes(listWithmanyBlogs)
    expect(result).toEqual({ author: 'Paul', likes: 41 })
  })
})
