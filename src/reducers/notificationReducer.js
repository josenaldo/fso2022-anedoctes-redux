import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  type: null,
}

const NOTIFICATION_TIMEOUT = 5000
const NOTIFICATION_TYPES = {
  SUCCESS: 'notification-success',
  ERROR: 'notification-error',
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.message = action.payload.message
      state.type = action.payload.type
    },

    removeNotification: (state) => {
      state.message = null
      state.type = null
    },
  },
})

export { NOTIFICATION_TYPES, NOTIFICATION_TIMEOUT }
export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
