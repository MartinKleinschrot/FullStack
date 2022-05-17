import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [notificationObject, setNotificationObject] = useState({message: null, success: false})
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
        url: newUrl
    }
    blogService
        .create(blogObject)
        .then(returnedBlog => {
            setBlogs(blogs.concat(returnedBlog))
            setNewTitle('')
            setNewAuthor('')
            setNewUrl('')
            setNotificationObject({ message: `Added '${blogObject.title}' from '${blogObject.author}'`, success: true })
            setTimeout(() => {
              setNotificationObject({ message: null, success: true })
            }, 5000) 
        })
        .catch(error => {
          setNotificationObject({ message: `Could not add '${blogObject.title}' from '${blogObject.author}' to the bloglist`, success:  false })
            setTimeout(() => {
              setNotificationObject({ message: null, success: true })
            }, 5000) 
        })
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      <h1>Blogs</h1>
      
      <Notification notification={notificationObject} />

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in</p><button type="submit" onClick={handleLogout} >logout</button>
          <form onSubmit={addBlog}>
              <div>title: <input value={newTitle} onChange={handleTitleChange}/></div>
              <div>author: <input value={newAuthor} onChange={handleAuthorChange}/></div>
              <div>url: <input value={newUrl} onChange={handleUrlChange}/></div>
              <div><button type="submit">create</button></div>
          </form>
          {blogForm()}
        </div>
      }

      
    </div>
  )
}

export default App
