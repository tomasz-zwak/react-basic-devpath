import './App.scss'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Logger from 'components/Logger/Logger'
import LoggerContextProvider from 'components/Logger/LoggerContext'
import CoalStocks from 'pages/CoalStock/CoalStock'
import Examples from 'pages/Examples'
import React from 'react'

import Breweries from './pages/Breweries'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LoggerContextProvider>
        <Examples />
        <hr />
        <Breweries />
        <hr />
        <CoalStocks />
        <hr />
        <Logger />
      </LoggerContextProvider>
    </QueryClientProvider>
  )
}

export default App
