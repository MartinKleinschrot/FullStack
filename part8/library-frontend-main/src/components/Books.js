import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genreToSearch, setGenreToSearch] = useState(null)
  const [genres, setGenres] = useState([])
  const {loading, error, data, refetch} = useQuery(ALL_BOOKS, {
    variables: { genre: genreToSearch },
    fetchPolicy: "no-cache"
  })

  let books = []

  if (genreToSearch && data) {
    books = data.allBooks
  } else {
    books = props.books.data.allBooks
  }

  if (!props.show) {
    return null
  }
  
  const currentGenres = genres
  books.forEach(book => {
    book.genres.forEach(genre => {
      if (!genres.find(g => g === genre)){
        genres.push(genre)
      }
    })
  });
  if (currentGenres !== genres){
    setGenres(genres)
  }

  const changeGenre = (genre) => {
    setGenreToSearch(genre)
    refetch()
  }

  return (
    <div>
      <h2>books</h2>
      {genreToSearch && <p>in genre {genreToSearch}</p>}
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
      {genres.map((genre) => (
        <button key={genre} onClick={() => changeGenre(genre)}>{genre}</button>  
      ))}
      <button onClick={() => changeGenre('')}>all genres</button>  
    </div>
  )
}

export default Books
