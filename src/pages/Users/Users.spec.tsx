import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import Users from 'pages/Users/Users'
import React from 'react'

describe('Users page', () => {
  let queryClient: QueryClient

  beforeAll(() => {
    queryClient = new QueryClient()
  })

  it('shows loading when the data is being fetched', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Users />
      </QueryClientProvider>
    )

    expect(screen.getByRole('progressbar')).toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()

    await waitFor(
      () => expect(screen.queryByRole('progressbar')).not.toBeInTheDocument(),
      { timeout: 2000 }
    )

    expect(screen.getByRole('table')).toBeInTheDocument()
  })
})
