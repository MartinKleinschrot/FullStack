import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'
import Select from 'react-select'

const Authors = (props) => {
  const [author, setAuthor] = useState('')
  const [born, setBornDate] = useState('')
  const [ changeBornDate ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  if (!props.show) {
    return null
  }

  const authors = props.authors
  const options = []
  for (let index = 0; index < authors.length; index++) {
    options[index] = { value: authors[index].name, label: authors[index].name}
  }

  const submit = (event) => {
    event.preventDefault()

    const name = author.value
    const setBornTo = Number(born)

    changeBornDate({ variables: { name, setBornTo } })

    setAuthor('')
    setBornDate('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <Select 
          defaultValue={author}
          onChange={setAuthor}
          options={options} />
        <div>
          born <input
            type="number"
            value={born}
            onChange={({ target }) => setBornDate(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
