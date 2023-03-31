import React from 'react'

import AnedocteForm from '@/components/AnedocteForm'
import AnedocteList from '@/components/AnedocteList'

import './App.css'

function App() {
  return (
    <div className="container">
      <main>
        <h1>Anecdotes</h1>
        <AnedocteList />
        <AnedocteForm />
      </main>
    </div>
  )
}

export default App
