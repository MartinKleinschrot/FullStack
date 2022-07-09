import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import SetAuthorBornDate from './components/SetAuthorBornDate'
import Recommendations from './components/Recommendations'
import { useQuery, useSubscription, useApolloClient } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries'

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }
  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.title} added`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })

  if (authors.loading || books.loading)  {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const changePage = (page) => {
    setPage(page)
  }

  return (
    <div>
      <div>
        <button onClick={() => changePage('authors')}>authors</button>
        <button onClick={() => changePage('books')}>books</button>
        {!token && <button onClick={() => changePage('login')}>login</button>}
        {token && <button onClick={() => changePage('add')}>add book</button>}
        {token && <button onClick={() => changePage('recommend')}>recommend</button>}
        {token && <button onClick={logout}>logout</button>}
      </div>
      <Notify errorMessage={errorMessage} />
      <Authors show={page === 'authors'} authors = {authors}/>
      {token && <SetAuthorBornDate show={page === 'authors'} authors = {authors}/>}
      <Books show={page === 'books'} books = {books}/>
      <NewBook show={page === 'add'} />
      <LoginForm show={page === 'login'} setToken={setToken} setError={notify} />
      <Recommendations show={page === 'recommend'}/>
    </div>
  )
}

export default App
