import { MakeGenerics, useMatch } from '@tanstack/react-location'
import React from 'react'

type BreweryGenerics = MakeGenerics<{
  Params: {
    breweryId: string
  }
}>

const Brewery = () => {
  const {
    params: { breweryId },
  } = useMatch<BreweryGenerics>()

  return <>{breweryId}</>
}

export default Brewery
