import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useDispatch, useSelector } from 'react-redux'

import Filter from '@/components/Filter'
import { setFilter } from '@/reducers/filterReducer'

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}))

describe('<Filter />', () => {
  let user
  let dispatchMock
  let container

  beforeEach(() => {
    user = userEvent.setup()
    dispatchMock = jest.fn()
    useDispatch.mockReturnValue(dispatchMock)
  })

  describe('when the store has no filter', () => {
    beforeEach(() => {
      container = render(<Filter />).container
    })

    it('renders a filter input and label', () => {
      const labelElement = container.querySelector('.filter label')
      expect(labelElement).toBeInTheDocument()
      expect(labelElement).toHaveTextContent('Filter')

      const inputElement = container.querySelector('.filter input')
      expect(inputElement).toBeInTheDocument()
      expect(inputElement).toHaveValue('')
    })

    it('dispatches setFilter action with correct payload when input value is changed', async () => {
      const inputElement = container.querySelector('.filter input')
      await user.type(inputElement, 'completed')

      expect(dispatchMock).toHaveBeenCalledTimes(9)
      expect(dispatchMock).toHaveBeenCalledWith(setFilter('completed'))
    })
  })

  describe('when the store has a filter', () => {
    beforeEach(() => {
      useSelector.mockReturnValue('all')
      container = render(<Filter />).container
    })

    it('renders a filter input with correct label and value', () => {
      const labelElement = container.querySelector('.filter label')
      expect(labelElement).toBeInTheDocument()
      expect(labelElement).toHaveTextContent('Filter')

      const inputElement = container.querySelector('.filter input')
      expect(inputElement).toBeInTheDocument()
      expect(inputElement).toHaveValue('all')
    })
  })
})
