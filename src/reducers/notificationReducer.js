import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: 'Teste',
  type: 'SUCCESS',
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      console.log('action', action)
      console.log('state', state)
    },
  },
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer
