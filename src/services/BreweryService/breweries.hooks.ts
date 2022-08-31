import { useQuery } from '@tanstack/react-query'
import { Brewery } from 'services/BreweryService/brewery.type'

import { breweries, brewery } from './brewery.service'

const useBreweries = (
  page: number,
  perPage: number,
  options?: {
    onSuccess?: (data: Brewery[]) => void
  }
) =>
  useQuery(['breweries', page, perPage], () => breweries(page, perPage), {
    keepPreviousData: true,
    onSuccess: options?.onSuccess,
  })

const useBrewery = (id: Brewery['id']) =>
  useQuery(['brewery', id], () => brewery(id))

export { useBreweries, useBrewery }
