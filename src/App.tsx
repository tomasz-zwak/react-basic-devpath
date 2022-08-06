import './App.scss'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

import Breweries from './pages/Beers'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Breweries />
    </QueryClientProvider>
  )
}

export default App
