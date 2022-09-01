import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Examples from 'pages/Examples'
import React from 'react'

const mockLogFn = jest.fn()
jest.mock('../components/Logger/use-logger', () => {
  return () => {
    return {
      ...jest.requireActual('../components/Logger/use-logger').default(),
      log: mockLogFn,
    }
  }
})

describe('Examples page', () => {
  beforeEach(() => {
    mockLogFn.mockRestore()
  })

  describe('StaleClosure', () => {
    test('should show component after checking the checkbox', async () => {
      render(<Examples />)
      userEvent.click(screen.getByRole('checkbox', { name: /stale closure/i }))

      expect(
        await screen.findByTestId('staleClosureContainer')
      ).toBeInTheDocument()
    })

    test('should log initial counter value every second', () => {
      jest.useFakeTimers()

      render(<Examples />)

      userEvent.click(screen.getByRole('checkbox', { name: /stale closure/i }))

      expect(mockLogFn).not.toHaveBeenCalled()

      jest.advanceTimersByTime(2000)

      expect(mockLogFn).toHaveBeenCalledTimes(2)

      jest.useRealTimers()
    })

    describe('when stale closure fixed checkbox is checked', () => {
      test('should log incremented counter value every second', async () => {
        jest.useFakeTimers()

        render(<Examples />)

        userEvent.click(
          screen.getByRole('checkbox', { name: /stale closure/i })
        )

        userEvent.click(screen.getByRole('checkbox', { name: /fixed/i }))

        expect(
          await screen.findByRole('checkbox', { name: /fixed/i })
        ).toBeChecked()

        userEvent.click(screen.getByRole('button', { name: /counter: 0/i }))

        jest.advanceTimersByTime(1000)

        expect(mockLogFn).toHaveBeenCalledWith(`Current count is: 1`)
        jest.useRealTimers()
      })
    })
  })
})
