import React, {useState} from 'react'

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selectedIdx, setSelectedIdx] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const handleVoteIncrement = () => {
    const newVotes = {...votes}
    newVotes[selectedIdx] += 1
    setVotes(newVotes)

    console.log('votes:', votes)
  }

  const handleNextAnecdote = () => {
    const newIdx = Math.floor(Math.random() * anecdotes.length)
    console.log('handleNextAnecdote / newIdx:', newIdx)
    setSelectedIdx(newIdx)
  }

  return (
    <div>
      <p>
        {anecdotes[selectedIdx]}
        <br />
        has {votes[selectedIdx]} votes
      </p>

      <Button text='Vote' handleClick={handleVoteIncrement} />
      &nbsp;
      <Button text='Next Anecdote' handleClick={handleNextAnecdote} />
    </div>
  )
}

export default App