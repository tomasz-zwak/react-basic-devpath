import './App.scss'

import { Link, Outlet, ReactLocation, Router } from '@tanstack/react-location'
import { ReactLocationDevtools } from '@tanstack/react-location-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Logger from 'components/Logger/Logger'
import LoggerContextProvider from 'components/Logger/LoggerContext'
import React from 'react'
import { useFavicon, useTitle } from 'react-use'
import { routes } from 'routes'

const Header = () => {
  useTitle('React Basic Katas')
  useFavicon(
    'https://icons.iconarchive.com/icons/hopstarter/sleek-xp-basic/256/Lamp-icon.png'
  )
  return (
    <nav>
      <ul>
        <li>
          <Link to={'/'}>Home</Link>
        </li>
        <li>
          <Link to={'/breweries'}>Breweries</Link>
        </li>
        <li>
          <Link to={'/breweries2'}>Breweries_2</Link>
        </li>
        <li>
          <Link to={'/coalStocks'}>Coal Stocks</Link>
        </li>
        <li>
          <Link to={'/examples'}>Examples</Link>
        </li>
        <li>
          <Link to={'/users'}>Users</Link>
        </li>
      </ul>
    </nav>
  )
}

const queryClient = new QueryClient()
const location = new ReactLocation()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router location={location} routes={routes}>
        <LoggerContextProvider>
          <Header />
          <Outlet />
          <Logger />
        </LoggerContextProvider>
        <ReactLocationDevtools initialIsOpen={true} />
        <ReactQueryDevtools initialIsOpen={true} />
      </Router>
    </QueryClientProvider>
  )
}

export default App
