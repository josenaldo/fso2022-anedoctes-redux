import { configureStore } from '@reduxjs/toolkit'
import notificationReducer, {
  setNotification,
  NOTIFICATION_TYPES,
  removeNotification,
} from '@/reducers/notificationReducer'

describe('notificationSlice reducer', () => {
  let store

  beforeEach(() => {
    store = configureStore({ reducer: notificationReducer })
  })

  it('should set notification', async () => {
    const message = 'Test notification message'
    const type = NOTIFICATION_TYPES.SUCCESS

    await store.dispatch(setNotification({ message, type }))
    expect(store.getState()).toEqual({ message, type })

    // Test the default type
    await store.dispatch(setNotification({ message }))
    expect(store.getState()).toEqual({
      message,
      type: NOTIFICATION_TYPES.INFO,
    })
  })

  it('should remove notification', () => {
    const message = 'Test notification message'
    const type = NOTIFICATION_TYPES.SUCCESS

    store.dispatch({
      type: setNotification.fulfilled,
      payload: { message, type },
    })
    expect(store.getState()).toEqual({ message, type })

    store.dispatch(removeNotification())
    expect(store.getState()).toEqual({
      message: null,
      type: null,
    })
  })

  it('should auto-remove notification after timeout', async () => {
    const message = 'Test notification message'
    const type = NOTIFICATION_TYPES.SUCCESS
    const timeoutInSeconds = 2

    await store.dispatch(setNotification({ message, type, timeoutInSeconds }))

    expect(store.getState()).toEqual({ message, type })

    // Test if the notification gets removed after the timeout
    return new Promise((resolve) => {
      setTimeout(() => {
        expect(store.getState()).toEqual({
          message: null,
          type: null,
        })
        resolve()
      }, timeoutInSeconds * 1000 + 100) // Adding an extra 100ms for setTimeout inaccuracy
    })
  })
})
