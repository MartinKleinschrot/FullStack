import userService from '../services/users'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then(users => {
      setUsers(users)
    })
  }, [])

  return(
    <div>
      <h2>Users</h2>
      <Table striped>
        <tbody>
          <tr>
            <td><b>User</b></td>
            <td><b>Blogs created</b></td>
          </tr>
          {users.map((user) =>
            <tr key={user.id}>
              <td><Link to={{ pathname: `/users/${user.id}` }}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Users