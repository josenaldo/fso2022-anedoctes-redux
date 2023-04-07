import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  removeNotification,
  NOTIFICATION_TIMEOUT,
} from '@/reducers/notificationReducer'

import './Notification.css'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)

  const close = () => {
    dispatch(removeNotification())
  }

  useEffect(() => {
    if (!notification?.message) {
      return
    }

    const timeout = setTimeout(() => {
      dispatch(removeNotification())
    }, NOTIFICATION_TIMEOUT)

    return () => clearTimeout(timeout)
  }, [notification])

  if (!notification.message) {
    return null
  }

  return (
    <div className={`notification ${notification.type}`} role="alert">
      <span className="close-button" onClick={close}>
        &times;
      </span>

      <span className="message">{notification.message}</span>
    </div>
  )
}

export default Notification
