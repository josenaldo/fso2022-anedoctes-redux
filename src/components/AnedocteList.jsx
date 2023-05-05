import { useSelector, useDispatch } from 'react-redux'
import { vote } from '@/reducers/anedocteReducer'
import { setNotification } from '@/reducers/notificationReducer'

const AnedocteList = () => {
  const dispatch = useDispatch()

  const anedoctes = useSelector(({ anedoctes, filter }) => {
    let filteredAnedoctes = anedoctes

    if (filter) {
      filteredAnedoctes = anedoctes.filter((anedocte) => {
        return anedocte.content.toLowerCase().includes(filter.toLowerCase())
      })
    }

    const sortedAnedoctes = [...filteredAnedoctes].sort(
      (a, b) => b.votes - a.votes
    )
    return sortedAnedoctes
  })

  const voteAnedocte = (anedocte) => {
    dispatch(vote(anedocte.id))
    dispatch(
      setNotification({
        message: `You voted for "${anedocte.content}"`,
      })
    )
  }

  if (anedoctes.length === 0) {
    return <article>No anedoctes found</article>
  }

  return (
    <div>
      {anedoctes.map((anedocte) => (
        <article
          id={`anedocte-${anedocte.id}`}
          className="anedocte"
          key={anedocte.id}
        >
          <div className="anedocte-content">
            <div className="content">{anedocte.content}</div>
            <div className="votes">
              <span className="votes-label">Votes</span>
              <span className="votes-value">{anedocte.votes}</span>
            </div>
          </div>
          <button
            className="vote-button secondary"
            onClick={() => voteAnedocte(anedocte)}
          >
            Vote
          </button>
        </article>
      ))}
    </div>
  )
}

export default AnedocteList
