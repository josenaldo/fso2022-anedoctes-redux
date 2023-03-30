import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './App.css'

function App() {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()
  const vote = (id) => {
    console.log('vote', id)
    dispatch({})
  }

  return (
    <div className="container">
      <main>
        <h1>Anecdotes</h1>

        {anecdotes.map((anecdote) => (
          <article key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </article>
        ))}

        <article>
          <h2>create new</h2>
          <form>
            <div>
              <input />
            </div>
            <button>create</button>
          </form>
        </article>
      </main>
    </div>
  )
}

export default App
