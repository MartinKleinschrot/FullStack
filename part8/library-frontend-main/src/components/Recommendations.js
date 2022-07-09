import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommendations = (props) => {
  const [genre, setGenre] = useState("")
  const user = useQuery(ME)
  const {loading, error, data, refetch} = useQuery(ALL_BOOKS, {
    variables: { genre: genre },
    fetchPolicy: "no-cache"
  })

  if (user.data && !genre && user.data.me) {
    setGenre(user.data.me.favouriteGenre)
  }

  let books = []
  if (data) {
    books = data.allBooks
  }

  if (!props.show) {
    return null
  }

  refetch()

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre {genre}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
