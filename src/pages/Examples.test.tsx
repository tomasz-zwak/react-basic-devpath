import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from 'App'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { renderWithProviders } from 'test/utils'
window.HTMLElement.prototype.scrollIntoView = jest.fn()

jest.useFakeTimers()

describe('Examples page', () => {
  test('Logs Stale Closure output into logger window', async () => {
    renderWithProviders(<App />)

    expect(await screen.findByRole('link', { name: /examples/i })).toBeDefined()

    userEvent.click(screen.getByRole('link', { name: /examples/i }))

    expect(
      await screen.findByRole('checkbox', { name: /show logger/i })
    ).toBeDefined()

    userEvent.click(screen.getByRole('checkbox', { name: /show logger/i }))

    expect(
      await screen.findByRole('checkbox', { name: /stale closure/i })
    ).toBeDefined()

    userEvent.click(screen.getByRole('checkbox', { name: /stale closure/i }))

    act(() => {
      jest.advanceTimersByTime(2000)
    })

    expect(screen.getByTestId('logger').childNodes).toHaveLength(2)
    expect(screen.getByTestId('logger')).toContainHTML(
      '<span style="color: lightblue; margin-right: .25em;">[StaleClosure]</span>'
    )
  })
})
