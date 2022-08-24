import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Examples from 'pages/Examples'
import React from 'react'

describe('Examples page', () => {
  test('should show StaleClosure component after checking the checkbox', async () => {
    render(<Examples />)
    userEvent.click(screen.getByRole('checkbox', { name: /stale closure/i }))

    expect(
      await screen.findByTestId('staleClosureContainer')
    ).toBeInTheDocument()
  })
})
