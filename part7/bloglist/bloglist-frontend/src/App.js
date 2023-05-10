import { useState, useEffect, useRef } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import User from './components/User'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotificationWithTime } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser, removeUser } from './reducers/userReducer'
import { Button, Navbar } from 'react-bootstrap'


const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotificationWithTime('Wrong credentials', 5, false))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    blogService.setToken(null)
    dispatch(removeUser())
    setUsername('')
    setPassword('')
  }

  const NewBlog = () => {
    return(
      <div>
        <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
          <BlogForm />
        </Togglable>
      </div>
    )
  }

  const Home = () => {
    return(
      <div>
        <NewBlog />
        <Blogs />
      </div>
    )
  }

  const padding = {
    padding: 5,
  }

  return (
    <div className="container">
      <Navbar bg='light' expand='lg'>
        <Link style={padding} to="/">Home</Link>
        <Link style={padding} to="/users">Users</Link>
        {user &&
          <em>{user.name} logged-in <Button variant='secondary' type="submit" onClick={handleLogout}>Logout</Button></em>
        }
      </Navbar>
      <h1>Blogs</h1>
      <Notification />
      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      ) : (
        <div>
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/" element={<Home />} />
            <Route path="/blogs/:id" element={<Blog user={user} />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App