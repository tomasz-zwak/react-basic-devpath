import './App.scss'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CoalStocks from 'pages/CoalStock/CoalStock'
import Examples from 'pages/Examples'
import React from 'react'

import Breweries from './pages/Breweries'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Examples />
      <hr />
      <Breweries />
      <hr />
      <CoalStocks />
      <hr />
    </QueryClientProvider>
  )
}

export default App
