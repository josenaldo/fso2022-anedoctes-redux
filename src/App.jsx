import React from 'react'
import { useDispatch } from 'react-redux'

import anedocteService from '@/services/anedoctes'
import { setAnedoctes } from '@/reducers/anedocteReducer'

import AnedocteForm from '@/components/AnedocteForm'
import AnedocteList from '@/components/AnedocteList'
import Filter from '@/components/Filter'
import Notification from '@/components/Notification'

import './App.css'

function App() {
  const dispatch = useDispatch()

  React.useEffect(() => {
    anedocteService.getAll().then((anedoctes) => {
      dispatch(setAnedoctes(anedoctes))
    })
  }, [dispatch])

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
