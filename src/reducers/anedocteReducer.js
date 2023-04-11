import { createSlice } from '@reduxjs/toolkit'

const anedoctesSlice = createSlice({
  name: 'anedoctes',
  initialState: [],
  reducers: {
    vote: (state, action) => {
      const id = action.payload

      const anedocteToVote = state.find((a) => a.id === id)

      const votedAnedocte = {
        ...anedocteToVote,
        votes: anedocteToVote.votes + 1,
      }

      return state.map((anedocte) => {
        return anedocte.id !== id ? anedocte : votedAnedocte
      })
    },
    create: (state, action) => {
      state.push(action.payload)
    },
    setAnedoctes: (state, action) => {
      return action.payload
    },
  },
})

export const { vote, create, setAnedoctes } = anedoctesSlice.actions
export default anedoctesSlice.reducer
