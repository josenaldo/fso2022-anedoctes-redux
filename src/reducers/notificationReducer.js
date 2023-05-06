import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const noNotificationState = {
  message: null,
  type: null,
  timeoutId: null,
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
    const { dispatch, getState } = thunkAPI
    const { notification } = getState()

    if (notification.timeoutId) {
      clearTimeout(notification.timeoutId)
    }

    const timeoutId = setTimeout(() => {
      dispatch({
        type: 'notification/removeNotification',
      })
    }, timeoutInSeconds * 1000)

    return {
      message: message,
      type: type,
      timeoutId: timeoutId,
    }
  }
)

const notificationSlice = createSlice({
  name: 'notification',
  initialState: noNotificationState,
  reducers: {
    removeNotification: (state) => {
      clearTimeout(state.timeoutId)
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
