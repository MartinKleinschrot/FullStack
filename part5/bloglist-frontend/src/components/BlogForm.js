import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

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

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return(
    <div>
      <form onSubmit={addBlog}>
        <div>title: <input value={newTitle} onChange={handleTitleChange} id='title' className='title'/></div>
        <div>author: <input value={newAuthor} onChange={handleAuthorChange} id='author' className='author'/></div>
        <div>url: <input value={newUrl} onChange={handleUrlChange} className='url' id='url'/></div>
        <div><button type="submit" id='addBlog'>create</button></div>
      </form>
    </div>
  )
}

export default BlogForm