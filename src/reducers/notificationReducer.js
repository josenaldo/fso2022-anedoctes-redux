import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const noNotificationState = {
  message: null,
  type: null,
}

const NOTIFICATION_TIMEOUT = 5

const NOTIFICATION_TYPES = {
  SUCCESS: 'notification-success',
  INFO: 'notification-info',
  WARNING: 'notification-warning',
  ERROR: 'notification-error',
}

const setNotification = createAsyncThunk(
  'notification/setNotification',
  async (
    {
      message,
      type = NOTIFICATION_TYPES.INFO,
      timeoutInSeconds = NOTIFICATION_TIMEOUT,
    },
    thunkAPI
  ) => {
    const dispatch = thunkAPI.dispatch

    setTimeout(() => {
      dispatch({
        type: 'notification/removeNotification',
      })
    }, timeoutInSeconds * 1000)

    return {
      message: message,
      type: type,
    }
  }
)

const notificationSlice = createSlice({
  name: 'notification',
  initialState: noNotificationState,
  reducers: {
    // eslint-disable-next-line no-unused-vars
    removeNotification: (state) => {
      return noNotificationState
    },
  },
  extraReducers: {
    [setNotification.fulfilled]: (state, action) => {
      return action.payload
    },
  },
})

export { setNotification, NOTIFICATION_TYPES }
export const { removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
