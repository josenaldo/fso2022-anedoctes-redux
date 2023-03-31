import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

import anedocteReducer from '@/reducers/anecdoteReducer'
import filterReducer from '@/reducers/filterReducer'
import App from './App'

const reducer = combineReducers({
  anedoctes: anedocteReducer,
  filter: filterReducer,
})

const store = createStore(reducer)

store.subscribe(() => {
  console.log('🟢 STORE', store.getState())
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
