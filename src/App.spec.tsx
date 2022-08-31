import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from 'App'
import React from 'react'

describe('App router', () => {
  test('displays home page', async () => {
    render(<App />)
    expect(await screen.findByText('Welcome to home page')).toBeInTheDocument()
  })

  test('displays examples page', async () => {
    render(<App />)
    userEvent.click(screen.getByRole('link', { name: /examples/i }))

    expect(
      await screen.findByRole('checkbox', { name: /stale closure/i })
    ).toBeInTheDocument()

    expect(
      await screen.findByRole('checkbox', { name: /optimized state/i })
    ).toBeInTheDocument()

    expect(
      await screen.findByRole('checkbox', { name: /memo example/i })
    ).toBeInTheDocument()

    expect(
      await screen.findByRole('checkbox', { name: /redirect effect/i })
    ).toBeInTheDocument()
  })
})
