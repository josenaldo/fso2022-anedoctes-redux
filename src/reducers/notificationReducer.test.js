import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer, {
  setNotification,
  NOTIFICATION_TYPES,
  removeNotification,
} from '@/reducers/notificationReducer'

const rootReducer = combineReducers({
  notification: notificationReducer,
})

describe('notificationSlice reducer', () => {
  let store

  beforeEach(() => {
    store = configureStore({
      reducer: rootReducer,
    })
  })

  it('should set success notification', async () => {
    const message = 'Test notification message'
    const type = NOTIFICATION_TYPES.SUCCESS

    await store.dispatch(setNotification({ message, type }))
    const { notification } = store.getState()

    expect(notification.message).toEqual(message)
    expect(notification.type).toEqual(type)
    expect(notification.timeoutId).toEqual(expect.any(Number))
  })

  it('should set a default notification', async () => {
    const message = 'Test notification message'

    await store.dispatch(setNotification({ message }))
    const { notification } = store.getState()

    expect(notification.message).toEqual(message)
    expect(notification.type).toEqual(NOTIFICATION_TYPES.INFO)
    expect(notification.timeoutId).toEqual(expect.any(Number))
  })

  it('should remove notification', async () => {
    const message = 'Test notification message'
    const type = NOTIFICATION_TYPES.SUCCESS

    await store.dispatch(setNotification({ message, type }))

    const { notification } = store.getState()

    expect(notification.message).toEqual(message)
    expect(notification.type).toEqual(type)
    expect(notification.timeoutId).toEqual(expect.any(Number))

    store.dispatch(removeNotification())
    expect(store.getState().notification).toEqual({
      message: null,
      type: null,
      timeoutId: null,
    })
  })

  it('should auto-remove notification after timeout', async () => {
    const message = 'Test notification message'
    const type = NOTIFICATION_TYPES.SUCCESS
    const timeoutInSeconds = 2

    await store.dispatch(setNotification({ message, type, timeoutInSeconds }))

    const { notification } = store.getState()

    expect(notification.message).toEqual(message)
    expect(notification.type).toEqual(type)
    expect(notification.timeoutId).toEqual(expect.any(Number))

    return new Promise((resolve) => {
      setTimeout(() => {
        expect(store.getState().notification).toEqual({
          message: null,
          type: null,
          timeoutId: null,
        })
        resolve()
      }, timeoutInSeconds * 1000 + 100)
    })
  })
})
