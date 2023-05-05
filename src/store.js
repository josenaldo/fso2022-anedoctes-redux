import { configureStore } from '@reduxjs/toolkit'

import anedocteReducer from '@/reducers/anedocteReducer'
import notificationReducer from '@/reducers/notificationReducer'
import filterReducer from '@/reducers/filterReducer'

const store = configureStore({
  reducer: {
    anedoctes: anedocteReducer,
    notification: notificationReducer,
    filter: filterReducer,
  },
})

export default store
