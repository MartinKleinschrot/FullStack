import { useState } from 'react'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { setBlogs } from '../reducers/blogReducer'
import { setNotificationWithTime } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

const BlogForm = () => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        dispatch(setBlogs(blogs.concat(returnedBlog)))
        dispatch(setNotificationWithTime(`Added '${blogObject.title}' from '${blogObject.author}'`, 5, true))
      })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <div>
            Title:{' '}
            <input
              value={newTitle}
              onChange={handleTitleChange}
              id="title"
              className="title"
            />
          </div>
          <div>
            Author:{' '}
            <input
              value={newAuthor}
              onChange={handleAuthorChange}
              id="author"
              className="author"
            />
          </div>
          <div>
            Url:{' '}
            <input
              value={newUrl}
              onChange={handleUrlChange}
              className="url"
              id="url"
            />
          </div>
          <div>
            <Button variant="primary" type="submit" id="addBlog">
              Create
            </Button>
          </div>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm
