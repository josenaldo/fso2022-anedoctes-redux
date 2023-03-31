import { useSelector, useDispatch } from 'react-redux'
import { vote } from '@/reducers/anecdoteReducer'

const AnedocteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector((state) => {
    return state.sort((a, b) => b.votes - a.votes)
  })

  if (anecdotes.length === 0) {
    return <article>No anedoctes found</article>
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <article
          id={`anecdote-${anecdote.id}`}
          className="anedocte"
          key={anecdote.id}
        >
          <div className="anedocte-content">
            <div className="content">{anecdote.content}</div>
            <div className="votes">
              <span className="votes-label">Votes</span>
              <span className="votes-value">{anecdote.votes}</span>
            </div>
          </div>
          <button
            className="vote-button secondary"
            onClick={() => dispatch(vote(anecdote.id))}
          >
            Vote
          </button>
        </article>
      ))}
    </div>
  )
}

export default AnedocteList
