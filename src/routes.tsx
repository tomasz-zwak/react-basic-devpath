import { Route } from '@tanstack/react-location'
import Breweries from 'pages/Breweries'
import Brewery from 'pages/Breweries/Brewery'
import CoalStocks from 'pages/CoalStock/CoalStock'
import Examples from 'pages/Examples'
import Home from 'pages/Home'
import Users from 'pages/Users'
import React from 'react'

export const routes: Route[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'breweries',
    element: <Breweries />,
    children: [
      {
        path: ':breweryId',
        element: <Brewery />,
      },
    ],
  },
  {
    path: 'coalStocks',
    element: <CoalStocks />,
  },
  {
    path: 'examples',
    element: <Examples />,
  },
  {
    path: 'users',
    element: <Users />,
  },
]
