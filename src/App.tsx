import './App.scss'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CoalStocks from 'pages/CoalStock/CoalStock'
import React from 'react'

import Breweries from './pages/Breweries'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Breweries />
      <hr />
      <CoalStocks />
    </QueryClientProvider>
  )
}

export default App
