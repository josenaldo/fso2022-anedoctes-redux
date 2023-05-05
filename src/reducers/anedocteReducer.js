import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import anedocteService from '@/services/anedoctes'

const initializeAnedoctes = createAsyncThunk(
  'anedoctes/initializeAnedoctes',
  async () => {
    const anedoctes = await anedocteService.getAll()

    return anedoctes
  }
)

const create = createAsyncThunk('anedoctes/create', async (content) => {
  const anedocte = await anedocteService.create(content)
  return anedocte
})

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
    setAnedoctes: (state, action) => {
      return action.payload
    },
  },

  extraReducers: {
    [initializeAnedoctes.fulfilled]: (state, action) => {
      return action.payload
    },
    [create.fulfilled]: (state, action) => {
      state.push(action.payload)
    },
  },
})

export { initializeAnedoctes, create }
export const { vote, setAnedoctes } = anedoctesSlice.actions
export default anedoctesSlice.reducer
