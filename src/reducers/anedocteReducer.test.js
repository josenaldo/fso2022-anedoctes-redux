import reducer, { vote, create } from '@/reducers/anedocteReducer'

describe('anedocte reducer', () => {
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

  it('should return the initial state', () => {
    const action = {
      type: 'anedoctes/doNothing',
    }
    const newState = reducer(initialState, action)

    expect(newState).toEqual(initialState)
  })

  it('should increase the number of votes', () => {
    const action = {
      type: 'anedoctes/vote',
      payload: '123',
    }
    const newState = reducer(initialState, action)

    expect(newState).toHaveLength(2)
    expect(newState[0].votes).toBe(1)
  })

  it('should add a new anedocte', () => {
    const action = {
      type: 'anedoctes/create',
      payload: 'A new anedocte is born',
    }
    const newState = reducer(initialState, action)

    expect(newState).toHaveLength(3)
    expect(newState[2].content).toBe('A new anedocte is born')
    expect(newState[2].votes).toBe(0)
    expect(newState[2].id).toBeDefined()
  })
})

describe('anedocte actions', () => {
  it('should create an action to vote', () => {
    const id = '123'
    const expectedAction = {
      type: 'anedoctes/vote',
      payload: id,
    }

    expect(vote(id)).toEqual(expectedAction)
  })

  it('should create an action to create a new anedocte', () => {
    const content = 'A new anedocte is born'
    const expectedAction = {
      type: 'anedoctes/create',
      payload: content,
    }

    const newAction = create(content)

    expect(newAction).toEqual(expectedAction)
  })
})
