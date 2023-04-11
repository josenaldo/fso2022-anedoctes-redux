import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useDispatch } from 'react-redux'

import AnedocteForm from './AnedocteForm'
import { create } from '@/reducers/anedocteReducer'

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}))

describe('<AnedocteForm />', () => {
  let container
  let dispatchMock

  beforeEach(() => {
    dispatchMock = jest.fn()
    useDispatch.mockReturnValue(dispatchMock)

    container = render(<AnedocteForm />).container
  })

  it('renders content input and submit button', () => {
    const contentInput = container.querySelector('input[name="content"]')
    const submitButton = container.querySelector('button[type="submit"]')

    expect(contentInput).toBeDefined()
    expect(submitButton).toBeDefined()
  })

  it('calls the create function with correct arguments when the form is submitted', async () => {
    const contentInput = container.querySelector('input[name="content"]')
    const submitButton = container.querySelector('button[type="submit"]')

    const content = 'Test content'

    const user = userEvent.setup()
    await user.type(contentInput, content)
    expect(contentInput).toHaveValue(content)

    await user.click(submitButton)

    expect(dispatchMock).toHaveBeenCalledTimes(1)
    const expectedAction = create(content)
    const actualAction = dispatchMock.mock.calls[0][0]

    expect(actualAction.content).toEqual(expectedAction.content)
    expect(actualAction.votes).toEqual(expectedAction.votes)
  })
})
