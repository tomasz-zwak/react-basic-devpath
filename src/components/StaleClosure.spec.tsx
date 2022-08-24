import { render } from '@testing-library/react'
import StaleClosure from 'components/StaleClosure'
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

describe('StaleClosure', () => {
  test.only('logs current counter value every second', () => {
    render(<StaleClosure />)

    expect(mockLogFn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(2000)

    expect(mockLogFn).toHaveBeenCalledTimes(2)
  })
})
