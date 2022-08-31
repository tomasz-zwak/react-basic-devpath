import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Examples from 'pages/Examples'
import React from 'react'

const mockLogFn = jest.fn()
jest.mock('hooks/use-logger', () => {
  return () => {
    return {
      log: mockLogFn,
    }
  }
})
jest.useFakeTimers()

describe('Examples page', () => {
  describe('StaleClosure', () => {
    test('should show component after checking the checkbox', async () => {
      render(<Examples />)
      userEvent.click(screen.getByRole('checkbox', { name: /stale closure/i }))

      expect(
        await screen.findByTestId('staleClosureContainer')
      ).toBeInTheDocument()
    })

    test('should log initial counter value every second', () => {
      render(<Examples />)

      userEvent.click(screen.getByRole('checkbox', { name: /stale closure/i }))

      expect(mockLogFn).not.toHaveBeenCalled()

      jest.advanceTimersByTime(2000)

      expect(mockLogFn).toHaveBeenCalledTimes(2)
    })

    describe('when stale closure fixed chackbox is checked', () => {
      test('should log incremented counter value every second', () => {
        render(<Examples />)

        userEvent.click(
          screen.getByRole('checkbox', { name: /stale closure/i })
        )

        userEvent.click(screen.getByRole('checkbox', { name: /fixed/i }))

        userEvent.click(screen.getByRole('button', { name: /counter: 0/i }))

        jest.advanceTimersByTime(1000)

        expect(mockLogFn).toHaveBeenCalledWith(`Current count is: 1`)
      })
    })
  })
})
