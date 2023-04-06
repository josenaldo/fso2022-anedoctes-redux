import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import anedocteReducer from '@/reducers/anecdoteReducer'
import filterReducer from '@/reducers/filterReducer'
import App from './App'

const store = configureStore({
  reducer: { anedoctes: anedocteReducer, filter: filterReducer },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
