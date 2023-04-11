import { createSlice } from '@reduxjs/toolkit'

const anedoctesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anedocte) => {
  return {
    content: anedocte,
    id: getId(),
    votes: 0,
  }
}

const initialState = anedoctesAtStart.map(asObject)

const anedoctesSlice = createSlice({
  name: 'anedoctes',
  initialState,
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
      const anedocte = asObject(action.payload)
      state.push(anedocte)
    },
    setAnedoctes: (state, action) => {
      return action.payload
    },
  },
})

export const { vote, create, setAnedoctes } = anedoctesSlice.actions
export default anedoctesSlice.reducer
