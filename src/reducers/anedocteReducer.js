import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import anedocteService from '@/services/anedoctes'

const initializeAnedoctes = createAsyncThunk(
  'anedoctes/initializeAnedoctes',
  async () => {
    const anedoctes = await anedocteService.getAll()

    return anedoctes
  }
)

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

  extraReducers: (builder) => {
    builder.addCase(initializeAnedoctes.fulfilled, (state, action) => {
      return action.payload
    })
  },
})

export { initializeAnedoctes }
export const { vote, create, setAnedoctes } = anedoctesSlice.actions
export default anedoctesSlice.reducer
