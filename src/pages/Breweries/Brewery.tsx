import { MakeGenerics, useMatch } from '@tanstack/react-location'
import classNames from 'classnames'
import Spinner from 'components/spinner'
import React from 'react'
import { useBrewery } from 'services/BreweryService/breweries.hooks'

type BreweryGenerics = MakeGenerics<{
  Params: {
    breweryId: string
  }
}>

const Brewery = () => {
  const {
    params: { breweryId },
  } = useMatch<BreweryGenerics>()

  const { data, isLoading, error } = useBrewery(breweryId)

  if (isLoading) return <Spinner size="small" />

  if (!data || error)
    return <p className={classNames({ error })}>{JSON.stringify(error)}</p>

  const { name, city, country, state, street, postalCode, phone } = data

  return (
    <>
      <p>{name}</p>
      <ul>
        <li>{city}</li>
        <li>{country}</li>
        <li>{state}</li>
        <li>{street}</li>
        <li>{postalCode}</li>
        <li>{phone}</li>
      </ul>
    </>
  )
}

export default Brewery
