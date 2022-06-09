import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)

  return(
    <div id="blogs">
      <h2>blogs</h2>
      <ListGroup>
        {blogs.map(blog => (
          <ListGroup.Item key={blog.id}><Link to={{ pathname: `/blogs/${blog.id}` }}>{blog.title} {blog.author}</Link></ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default Blogs