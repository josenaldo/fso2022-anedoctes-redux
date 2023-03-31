import React from 'react'
import { render, screen } from '@testing-library/react'
import { useSelector, useDispatch } from 'react-redux'
import userEvent from '@testing-library/user-event'

import AnedocteList from './AnedocteList'
import { vote } from '@/reducers/anecdoteReducer'

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

describe('<AnedocteList />', () => {
  let dispatchMock
  let anecdotes
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
      anecdotes = [
        { id: 1, content: 'Test content 1', votes: 0 },
        { id: 2, content: 'Test content 2', votes: 3 },
        { id: 3, content: 'Test content 3', votes: 2 },
      ]

      useSelector.mockReturnValue(anecdotes.sort((a, b) => b.votes - a.votes))
      container = render(<AnedocteList />).container
    })

    it('renders all anecdotes', () => {
      anecdotes.forEach((anecdote) => {
        const anecdoteElement = container.querySelector(
          `#anecdote-${anecdote.id}`
        )
        expect(anecdoteElement).toBeInTheDocument()

        const contentElement = screen.getByText(anecdote.content)
        expect(contentElement).toBeInTheDocument()
        expect(contentElement).toHaveTextContent(anecdote.content)

        const votesElement = container.querySelector(
          `#anecdote-${anecdote.id} .votes-value`
        )
        expect(votesElement).toBeInTheDocument()
        expect(votesElement).toHaveTextContent(anecdote.votes)
      })
    })

    it('renders the anecdotes sorted by number of votes', () => {
      const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
      const anecdoteElements = container.querySelectorAll('article.anedocte')

      anecdoteElements.forEach((element, index) => {
        const contentElement = element.querySelector('.content')
        const votesElement = element.querySelector('.votes-value')

        expect(contentElement.textContent).toEqual(
          sortedAnecdotes[index].content
        )
        expect(votesElement.textContent).toContain(
          sortedAnecdotes[index].votes.toString()
        )
      })
    })

    it('dispatches vote action when vote button is clicked', async () => {
      anecdotes.forEach(async (anecdote) => {
        const voteButton = container.querySelector(
          `#anecdote-${anecdote.id} .vote-button`
        )
        await user.click(voteButton)

        expect(dispatchMock).toHaveBeenCalledTimes(1)
        expect(dispatchMock).toHaveBeenCalledWith(vote(anecdote.id))
      })
    })
  })
})
