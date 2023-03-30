import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '@/reducers/anecdoteReducer'

import AnedocteForm from '@/components/AnedocteForm'

import './App.css'

function App() {
  const anecdotes = useSelector((state) => {
    return state.sort((a, b) => b.votes - a.votes)
  })
  const dispatch = useDispatch()

  return (
    <div className="container">
      <main>
        <h1>Anecdotes</h1>

        {anecdotes.map((anecdote) => (
          <article className="anedocte" key={anecdote.id}>
            <div className="anedocte-content">
              <div>{anecdote.content}</div>
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

        <AnedocteForm />
      </main>
    </div>
  )
}

export default App
