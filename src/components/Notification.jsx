import { useSelector, useDispatch } from 'react-redux'

import { removeNotification } from '@/reducers/notificationReducer'

import './Notification.css'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)

  const close = () => {
    dispatch(removeNotification())
  }

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
