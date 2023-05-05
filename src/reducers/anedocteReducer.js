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

const vote = createAsyncThunk('anedoctes/vote', async (id) => {
  const anedocte = await anedocteService.vote(id)
  return anedocte
})

const anedoctesSlice = createSlice({
  name: 'anedoctes',
  initialState: [],
  reducers: {},

  extraReducers: {
    [initializeAnedoctes.fulfilled]: (state, action) => {
      return action.payload
    },
    [create.fulfilled]: (state, action) => {
      state.push(action.payload)
    },
    [vote.fulfilled]: (state, action) => {
      const voted = action.payload

      return state.map((anedocte) => {
        return anedocte.id !== voted.id ? anedocte : voted
      })
    },
  },
})

export { initializeAnedoctes, create, vote }
export default anedoctesSlice.reducer
