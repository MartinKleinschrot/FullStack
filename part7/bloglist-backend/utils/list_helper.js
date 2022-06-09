const totalLikes = (blogs) => {
  let totallikes = 0
  blogs.forEach((blog) => {
    totallikes += blog.likes
  })
  return totallikes
}

const favoriteBlog = (blogs) => {
  let mostlikes = 0
  let favoriteBlog = {}
  blogs.forEach((blog) => {
    if (blog.likes > mostlikes) {
      mostlikes = blog.likes
      favoriteBlog = blog
    }
  })
  return favoriteBlog
}

const mostBlogs = (blogs) => {
  let authors = []
  blogs.forEach((blog) => {
    if (!authors.find((author) => author.author === blog.author)) {
      let newAuthor = { author: blog.author, blogs: 1 }
      authors.push(newAuthor)
    } else {
      authors.find((author) => author.author === blog.author).blogs =
        authors.find((author) => author.author === blog.author).blogs + 1
    }
  })

  let mostOccurances = 0
  let mostOccuringAuthor = {}
  authors.forEach((author) => {
    if (mostOccurances < author.blogs) {
      mostOccurances = author.blogs
      mostOccuringAuthor = author
    }
  })
  return mostOccuringAuthor
}

const mostLikes = (blogs) => {
  let authors = []
  blogs.forEach((blog) => {
    if (!authors.find((author) => author.author === blog.author)) {
      let newAuthor = { author: blog.author, likes: blog.likes }
      authors.push(newAuthor)
    } else {
      authors.find((author) => author.author === blog.author).likes =
        authors.find((author) => author.author === blog.author).likes +
        blog.likes
    }
  })

  let mostLikes = 0
  let mostLikedAuthor = {}
  authors.forEach((author) => {
    if (mostLikes < author.likes) {
      mostLikes = author.likes
      mostLikedAuthor = author
    }
  })
  return mostLikedAuthor
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
