import React from 'react'

import AnedocteForm from '@/components/AnedocteForm'
import AnedocteList from '@/components/AnedocteList'
import Filter from '@/components/Filter'
import Notification from '@/components/Notification'

import './App.css'

function App() {
  return (
    <div className="container">
      <main>
        <h1>Anedoctes</h1>
        <Notification />
        <Filter />
        <AnedocteList />
        <AnedocteForm />
      </main>
    </div>
  )
}

export default App
