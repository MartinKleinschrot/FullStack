import { useSelector, useDispatch } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { setNotificationWithTime } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    const workableAnecdotes = [...anecdotes]
    function compare( a, b ) {
      if ( a.votes > b.votes ){
        return -1;
      }
      if ( a.votes < b.votes ){
        return 1;
      }
      return 0;
    }

    if (anecdotes.length > 0) {
      workableAnecdotes.sort( compare );
    }
    

    if ( !filter ) {
      return workableAnecdotes
    } else {
      return workableAnecdotes.filter(anecdote => anecdote.content.includes(filter))
    }
  })

  return(
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => {
              dispatch(updateAnecdote(anecdote.id, {...anecdote, votes: anecdote.votes + 1}))
              dispatch(setNotificationWithTime(`you voted '${anecdote.content}'`, 5))
            }}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
