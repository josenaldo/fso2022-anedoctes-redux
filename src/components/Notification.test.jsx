import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { useSelector, useDispatch } from 'react-redux'
import Notification from '@/components/Notification'
import {
  NOTIFICATION_TYPES,
  removeNotification,
} from '@/reducers/notificationReducer'

jest.mock('react-redux')

describe('<Notification />', () => {
  let dispatchMock

  beforeEach(() => {
    dispatchMock = jest.fn()

    useDispatch.mockReturnValue(dispatchMock)
  })

  describe('when no notification is set ', () => {
    beforeEach(() => {
      useSelector.mockImplementation((selectorFn) =>
        selectorFn({
          notification: {
            message: null,
            type: null,
          },
        })
      )

      render(<Notification />)
    })

    it('does not render when there is no notification', () => {
      const notificationElement = screen.queryByRole('alert')
      expect(notificationElement).not.toBeInTheDocument()
    })
  })

  describe('when SUCCESS notification is set', () => {
    beforeEach(() => {
      useSelector.mockImplementation((selectorFn) =>
        selectorFn({
          notification: {
            message: 'Success Message',
            type: NOTIFICATION_TYPES.SUCCESS,
          },
        })
      )

      render(<Notification />)
    })

    it('renders success notification message and type correctly', () => {
      const notificationElement = screen.getByRole('alert')

      expect(notificationElement).toBeInTheDocument()
      expect(notificationElement).toHaveClass('notification-success')

      const messageElement = screen.getByText('Success Message')
      expect(messageElement).toBeInTheDocument()
    })

    it('dispatches removeNotification action when close button is clicked', async () => {
      const closeButton = screen.getByText('×')
      await userEvent.click(closeButton)

      expect(dispatchMock).toHaveBeenCalledTimes(1)
      expect(dispatchMock).toHaveBeenCalledWith(removeNotification())
    })
  })

  describe('when ERROR notification is set', () => {
    beforeEach(() => {
      useSelector.mockImplementation((selectorFn) =>
        selectorFn({
          notification: {
            message: 'Error Message',
            type: NOTIFICATION_TYPES.ERROR,
          },
        })
      )

      render(<Notification />)
    })

    it('renders error notification message and type correctly', () => {
      const notificationElement = screen.getByRole('alert')

      expect(notificationElement).toBeInTheDocument()
      expect(notificationElement).toHaveClass('notification-error')

      const messageElement = screen.getByText('Error Message')
      expect(messageElement).toBeInTheDocument()
    })
  })
})
