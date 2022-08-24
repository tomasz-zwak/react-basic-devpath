import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import React from 'react'
import { useUsers } from 'services/UserService/user.hooks'

describe('UserHooks', () => {
  describe('useUsers', () => {
    test('fetches users using react-query', async () => {
      const queryClient = new QueryClient()
      const wrapper = ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      )

      const { result } = renderHook(() => useUsers(), { wrapper })

      await waitFor(
        () =>
          expect(result.current.data).toEqual([
            {
              name: 'John Doe',
              age: '99',
              email: 'jdoe@example.com',
              photos: [],
              id: 1,
            },
          ]),
        {
          timeout: 2000,
        }
      )
    })
  })
})
