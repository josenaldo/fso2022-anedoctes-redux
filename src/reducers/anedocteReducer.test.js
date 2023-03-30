import reducer, { vote } from '@/reducers/anecdoteReducer'

describe('anecdote reducer', () => {
  const initialState = [
    {
      content: 'If it hurts, do it more often',
      id: '123',
      votes: 0,
    },
    {
      content: 'Adding manpower to a late software project makes it later!',
      id: '456',
      votes: 0,
    },
  ]

  test('should return the initial state', () => {
    const action = {
      type: 'DO_NOTHING',
    }
    const newState = reducer(initialState, action)

    expect(newState).toEqual(initialState)
  })

  test('should increase the number of votes', () => {
    const action = {
      type: 'VOTE',
      id: '123',
    }
    const newState = reducer(initialState, action)

    expect(newState).toHaveLength(2)
    expect(newState[0].votes).toBe(1)
  })

  // test('should add a new anecdote', () => {
  //   const action = {
  //     type: 'NEW_ANECDOTE',
  //     data: {
  //       content: 'A new anecdote is born',
  //       id: '789',
  //       votes: 0,
  //     },
  //   }
  //   const newState = reducer(initialState, action)

  //   expect(newState).toHaveLength(3)
  //   expect(newState[2].content).toBe('A new anecdote is born')
  // })
})

describe('anecdote actions', () => {
  test('should create an action to vote', () => {
    const id = '123'
    const expectedAction = {
      type: 'VOTE',
      id,
    }

    expect(vote(id)).toEqual(expectedAction)
  })
})
