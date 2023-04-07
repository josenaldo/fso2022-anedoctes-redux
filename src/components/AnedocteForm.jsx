import React from 'react'
import { useDispatch } from 'react-redux'
import { create } from '@/reducers/anecdoteReducer'
import {
  setNotification,
  NOTIFICATION_TYPES,
} from '@/reducers/notificationReducer'

const AnedocteForm = () => {
  const dispatch = useDispatch()
  const [content, setContent] = React.useState('')

  const addAnedocte = (event) => {
    event.preventDefault()

    dispatch(create(content))
    setContent('')

    dispatch(
      setNotification({
        message: `You created the anedocte "${content}"`,
        type: NOTIFICATION_TYPES.SUCCESS,
      })
    )
  }

  return (
    <article>
      <h2>Create new anedocte</h2>
      <form onSubmit={addAnedocte}>
        <label>
          Content
          <input
            name="content"
            value={content}
            onChange={({ target }) => {
              setContent(target.value)
            }}
          />
        </label>
        <button type="submit">Create</button>
      </form>
    </article>
  )
}

export default AnedocteForm
