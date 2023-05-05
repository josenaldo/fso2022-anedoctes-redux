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
      return {
        message: action.payload.message,
        type: action.payload.type,
      }
    },
    // eslint-disable-next-line no-unused-vars
    removeNotification: (state) => {
      return initialState
    },
    setSuccessNotification: (state, action) => {
      return {
        message: action.payload,
        type: NOTIFICATION_TYPES.SUCCESS,
      }
    },
    setInfoNotification: (state, action) => {
      return {
        message: action.payload,
        type: NOTIFICATION_TYPES.SUCCESS,
      }
    },
    setWarningNotification: (state, action) => {
      return {
        message: action.payload,
        type: NOTIFICATION_TYPES.WARNING,
      }
    },
    setErrorNotification: (state, action) => {
      return {
        message: action.payload,
        type: NOTIFICATION_TYPES.ERROR,
      }
    },
  },
})

export { NOTIFICATION_TYPES, NOTIFICATION_TIMEOUT }
export const {
  setNotification,
  removeNotification,
  setSuccessNotification,
  setInfoNotification,
  setWarningNotification,
  setErrorNotification,
} = notificationSlice.actions
export default notificationSlice.reducer
