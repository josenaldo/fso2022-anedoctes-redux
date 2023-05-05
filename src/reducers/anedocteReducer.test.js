import { configureStore } from '@reduxjs/toolkit'
import anedoctesReducer, {
  initializeAnedoctes,
  create,
  vote,
} from '@/reducers/anedocteReducer'
import anedocteService from '@/services/anedoctes'

jest.mock('@/services/anedoctes')

describe('anedoctesSlice reducer', () => {
  let store

  beforeEach(() => {
    store = configureStore({ reducer: anedoctesReducer })
  })

  it('should initialize anedoctes', async () => {
    const anedoctes = [
      { id: '1', content: 'Test anedocte 1', votes: 0 },
      { id: '2', content: 'Test anedocte 2', votes: 0 },
    ]

    anedocteService.getAll.mockResolvedValue(anedoctes)

    await store.dispatch(initializeAnedoctes())
    expect(store.getState()).toEqual(anedoctes)
  })

  it('should create an anedocte', async () => {
    const newAnedocte = { id: '1', content: 'Test anedocte', votes: 0 }

    anedocteService.create.mockResolvedValue(newAnedocte)

    await store.dispatch(create('Test anedocte'))
    expect(store.getState()).toHaveLength(1)
    expect(store.getState()[0]).toEqual(newAnedocte)
  })

  it('should vote for an anedocte', async () => {
    const anedoctes = [
      { id: '1', content: 'Test anedocte 1', votes: 0 },
      { id: '2', content: 'Test anedocte 2', votes: 0 },
    ]

    const votedAnedocte = { id: '1', content: 'Test anedocte 1', votes: 1 }

    anedocteService.vote.mockResolvedValue(votedAnedocte)

    store.dispatch({ type: initializeAnedoctes.fulfilled, payload: anedoctes })

    await store.dispatch(vote('1'))
    expect(store.getState()[0]).toEqual(votedAnedocte)
  })
})
