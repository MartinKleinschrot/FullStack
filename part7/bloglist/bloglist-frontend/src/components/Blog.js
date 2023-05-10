import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import { setNotificationWithTime } from '../reducers/notificationReducer'
import { Form, Button, ListGroup } from 'react-bootstrap'

const Blog = ({ user }) => {
  const dispatch = useDispatch()
  const [blog, setBlog] = useState(null)
  const id = useParams().id

  useEffect(() => {
    blogService.getBlog(id).then(blog => {
      setBlog(blog)
    })
  }, [])

  const updateBlog = () => {
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id,
      user: blog.user,
      comments: blog.comments
    }

    blogService
      .update(newBlog)
      .then(() => {
        setBlog(newBlog)
      })
      .catch(() => {
        dispatch(setNotificationWithTime(`Like of '${newBlog.title}' from '${newBlog.author}' failed`, 5, false))
      })
  }

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService
        .deleteBlog(blog.id)
        .then(() => {
          setBlog(null)
          dispatch(setNotificationWithTime(`Deleted '${blog.title}' from '${blog.author}'`, 5, true))
        })
        .catch(() => {
          dispatch(setNotificationWithTime(`Could not delete '${blog.title}' from '${blog.author}' from the bloglist`, 5, false))
        })
    }
  }

  const addComment = (event) => {
    event.preventDefault()
    blog.comments.push(event.target[0].value)

    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      id: blog.id,
      user: blog.user,
      comments: blog.comments
    }

    blogService
      .update(newBlog)
      .then(() => {
        setBlog(newBlog)
      })
      .catch(() => {
        dispatch(setNotificationWithTime(`Comment ${event.target[0].value} to '${newBlog.title}' from '${newBlog.author}' couldn't be saved`, 5, false))
      })
  }

  if(!blog){
    return null
  } else {
    return (
      <div className="blogContent">
        <h1>{blog.title} {blog.author}</h1><br/>
        <Link to={blog.url}>{blog.url}</Link>
        <div className="likes">
          likes {blog.likes}
          <Button variant="secondary" onClick={updateBlog} className="btnLike">like</Button>
        </div>
        added by {user.name}
        {(!blog.user || user.id === blog.user.id || !blog.user.id) && (
          <button onClick={deleteBlog}>remove</button>
        )}
        <h2>comments</h2>
        <Form onSubmit={addComment}>
          <Form.Group>
            <input name='comment' />
            <Button variant="primary" type="submit" id="addComment">add comment</Button>
          </Form.Group>
        </Form>
        <ListGroup>
          {blog.comments.map((comment, index) => (
            <ListGroup.Item key={index}>{comment}</ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    )
  }
}

Blog.propTypes = {
  user: PropTypes.object.isRequired,
}

export default Blog
