import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [voting, setVoted] = useState( Array(7).fill(0))

  const handleVoting = () => {
    const newVoting = [...voting]
    newVoting[selected] += 1 
    setVoted(newVoting)
  }

  const getMaxIndex = () => {
    const max = Math.max(...voting);
    const index = voting.indexOf(max);
    return index
  }

  return (
    <div>
        <div>
            <h1>Anecdote of the day</h1>
        </div>
        <div>
            {anecdotes[selected]}
        </div>
        <div>
            has {voting[selected]} votes
        </div>
        <div>
            <button onClick={handleVoting}>vote</button>  
            <button onClick={() => setSelected(Math.floor(Math.random() * (7 - 0)))}>next anecdotes</button>
        </div>
        <div>
            <h1>Anecdote with the most votes</h1>
        </div>
        <div>
            {anecdotes[getMaxIndex()]}
        </div>
        <div>
            has {voting[getMaxIndex()]} votes
        </div>
    </div>
  )
}

export default App