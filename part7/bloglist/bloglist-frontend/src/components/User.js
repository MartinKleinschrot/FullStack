import userService from '../services/users'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const User = () => {
  const [user, setUser] = useState(null)
  const id = useParams().id

  useEffect(() => {
    userService.getUser(id).then(user => {
      setUser(user)
    })
  }, [])

  if (!user) {
    return null
  } else {
    return(
      <div>
        <h2>{user.name}</h2>
        <ListGroup>
          {user.blogs.map((blog) =>
            <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
          )}
        </ListGroup>
      </div>
    )
  }
}

export default User