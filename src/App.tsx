import './App.scss'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Checkbox from 'components/Checkbox'
import Logger from 'components/Logger/Logger'
import LoggerContextProvider from 'components/Logger/LoggerContext'
import CoalStocks from 'pages/CoalStock/CoalStock'
import Examples from 'pages/Examples'
import React, { useState } from 'react'

import Breweries from './pages/Breweries'

const queryClient = new QueryClient()

function App() {
  const [isLoggerVisible, setLoggerVisible] = useState(false)

  return (
    <QueryClientProvider client={queryClient}>
      <Checkbox
        label="Show logger"
        onChecked={() => setLoggerVisible(true)}
        onUnchecked={() => setLoggerVisible(false)}
      />
      <hr />
      <LoggerContextProvider>
        <Examples />
        <hr />
        <Breweries />
        <hr />
        <CoalStocks />
        <hr />
        {isLoggerVisible && <Logger />}
      </LoggerContextProvider>
    </QueryClientProvider>
  )
}

export default App
