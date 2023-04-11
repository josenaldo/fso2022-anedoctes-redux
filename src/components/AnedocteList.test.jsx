import React from 'react'
import { render, screen } from '@testing-library/react'
import { useSelector, useDispatch } from 'react-redux'
import userEvent from '@testing-library/user-event'

import AnedocteList from './AnedocteList'
import { vote } from '@/reducers/anedocteReducer'

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

describe('<AnedocteList />', () => {
  let dispatchMock
  let anedoctes
  let user
  let container

  beforeEach(() => {
    dispatchMock = jest.fn()
    useDispatch.mockReturnValue(dispatchMock)
    user = userEvent.setup()
  })

  describe('when there are no anedoctes', () => {
    beforeEach(() => {
      useSelector.mockReturnValue([])
      container = render(<AnedocteList />).container
    })

    it('renders no anedoctes found', () => {
      const noAnedoctesElement = screen.getByText('No anedoctes found')
      expect(noAnedoctesElement).toBeInTheDocument()
    })
  })

  describe('when there are anedoctes', () => {
    beforeEach(() => {
      anedoctes = [
        { id: 1, content: 'Test content 1', votes: 0 },
        { id: 2, content: 'Test content 2', votes: 3 },
        { id: 3, content: 'Test content 3', votes: 2 },
      ]

      useSelector.mockReturnValue(anedoctes.sort((a, b) => b.votes - a.votes))
      container = render(<AnedocteList />).container
    })

    it('renders all anedoctes', () => {
      anedoctes.forEach((anedocte) => {
        const anedocteElement = container.querySelector(
          `#anedocte-${anedocte.id}`
        )
        expect(anedocteElement).toBeInTheDocument()

        const contentElement = screen.getByText(anedocte.content)
        expect(contentElement).toBeInTheDocument()
        expect(contentElement).toHaveTextContent(anedocte.content)

        const votesElement = container.querySelector(
          `#anedocte-${anedocte.id} .votes-value`
        )
        expect(votesElement).toBeInTheDocument()
        expect(votesElement).toHaveTextContent(anedocte.votes)
      })
    })

    it('renders the anedoctes sorted by number of votes', () => {
      const sortedAnedoctes = [...anedoctes].sort((a, b) => b.votes - a.votes)
      const anedocteElements = container.querySelectorAll('article.anedocte')

      anedocteElements.forEach((element, index) => {
        const contentElement = element.querySelector('.content')
        const votesElement = element.querySelector('.votes-value')

        expect(contentElement.textContent).toEqual(
          sortedAnedoctes[index].content
        )
        expect(votesElement.textContent).toContain(
          sortedAnedoctes[index].votes.toString()
        )
      })
    })

    it('dispatches vote action when vote button is clicked', async () => {
      anedoctes.forEach(async (anedocte) => {
        const voteButton = container.querySelector(
          `#anedocte-${anedocte.id} .vote-button`
        )
        await user.click(voteButton)

        expect(dispatchMock).toHaveBeenCalledTimes(1)
        expect(dispatchMock).toHaveBeenCalledWith(vote(anedocte.id))
      })
    })
  })
})
