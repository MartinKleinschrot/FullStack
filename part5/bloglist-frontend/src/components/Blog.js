import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, deleteBlog, updateBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const like = () => {
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id
    }
    updateBlog(blog.id, newBlog)
  }

  const deleteBlogobject = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      deleteBlog(blog)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className="blogContent">
      {blog.title} {blog.author} <button style={hideWhenVisible} onClick={toggleVisibility} className="showContent">view</button>
      <div style={showWhenVisible} className="togglableContent">
        <button onClick={toggleVisibility} >hide</button>
        <div>{blog.url}</div>
        <div className='likes'>likes {blog.likes}<button onClick={like} className='btnLike'>like</button></div>
        <div>{blog.author}</div>
        {(!blog.user || user.id === blog.user.id || !blog.user.id) &&
          <button onClick={deleteBlogobject}>remove</button>
        }
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default Blog