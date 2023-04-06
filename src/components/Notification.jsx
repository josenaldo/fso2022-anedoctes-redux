import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  return (
    <div className={`alert ${notification.type}`}>{notification.message}</div>
  )
}

export default Notification
