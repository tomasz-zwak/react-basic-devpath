import { Route } from '@tanstack/react-location'
import Breweries from 'pages/Breweries'
import Breweries2 from 'pages/Breweries/Breweries2'
import Brewery from 'pages/Breweries/Brewery'
import CoalStocks from 'pages/CoalStock/CoalStock'
import Examples from 'pages/Examples'
import Home from 'pages/Home'
import Users from 'pages/Users'
import UserInfo from 'pages/Users/User'
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
    path: 'breweries2',
    element: <Breweries2 />,
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
    children: [
      {
        path: ':userId',
        element: <UserInfo />,
      },
    ],
  },
]
