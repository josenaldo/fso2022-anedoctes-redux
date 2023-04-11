import React from 'react'
import { useDispatch } from 'react-redux'

import anedocteService from '@/services/anedoctes'

import { create } from '@/reducers/anedocteReducer'
import {
  setNotification,
  NOTIFICATION_TYPES,
} from '@/reducers/notificationReducer'

const AnedocteForm = () => {
  const dispatch = useDispatch()
  const [content, setContent] = React.useState('')

  const createAnedocte = async (event) => {
    event.preventDefault()

    const createdAnedocte = await anedocteService.create(content)

    dispatch(create(createdAnedocte))
    setContent('')

    dispatch(
      setNotification({
        message: `You created the anedocte "${createdAnedocte.content}"`,
        type: NOTIFICATION_TYPES.SUCCESS,
      })
    )
  }

  return (
    <article>
      <h2>Create new anedocte</h2>
      <form onSubmit={createAnedocte}>
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
