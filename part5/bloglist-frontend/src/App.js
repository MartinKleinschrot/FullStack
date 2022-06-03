import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationObject, setNotificationObject] = useState({ message: null, success: false })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort(function (a,b) {
        return b.likes - a.likes
      })
      setBlogs( blogs )
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationObject({ message: 'Wrong credentials', success: false })
      setTimeout(() => {
        setNotificationObject({ message: null, success: false })
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    blogService.setToken(null)
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        console.log(blogFormRef)
        setNotificationObject({ message: `Added '${blogObject.title}' from '${blogObject.author}'`, success: true })
        setTimeout(() => {
          setNotificationObject({ message: null, success: true })
        }, 5000)
      })
      .catch(() => {
        setNotificationObject({ message: `Could not add '${blogObject.title}' from '${blogObject.author}' to the bloglist`, success:  false })
        setTimeout(() => {
          setNotificationObject({ message: null, success: true })
        }, 5000)
      })
  }

  const deleteBlog = (blogObject) => {
    blogService.deleteBlog(blogObject.id)
      .then(() => {
        setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
        setNotificationObject({ message: `Deleted '${blogObject.title}' from '${blogObject.author}'`, success: true })
        setTimeout(() => {
          setNotificationObject({ message: null, success: true })
        }, 5000)
      })
      .catch(() => {
        setNotificationObject({ message: `Could not delete '${blogObject.title}' from '${blogObject.author}' from the bloglist`, success:  false })
        setTimeout(() => {
          setNotificationObject({ message: null, success: true })
        }, 5000)
      })
  }

  const updateBlog = (blogid, blogObject) => {
    blogService.update(blogid, blogObject)
      .then(() => {
        //console.log(blogs)
        const newBlogs = blogs.map(blog => blog.id !== blogid ? blog : blogObject)
        setBlogs(newBlogs)
        //console.log(blogs)
      })
      .catch(() => {
        setNotificationObject({ message: `Could not delete '${blogObject.title}' from '${blogObject.author}' from the bloglist`, success:  false })
        setTimeout(() => {
          setNotificationObject({ message: null, success: true })
        }, 5000)
      })
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification notification={notificationObject} />
      {user === null ?
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable> :
        <div>
          <p>{user.name} logged-in <button type="submit" onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog}/>
          </Togglable>
          <div id='blogs'>
            <h2>blogs</h2>
            {blogs.map(blog =>
              <Blog className='blog' key={blog.id} blog={blog} user={user} deleteBlog={deleteBlog} updateBlog={updateBlog}/>
            )}
          </div>
        </div>
      }
    </div>
  )
}

export default App
