import { useQuery } from '@tanstack/react-query'
import { breweries } from 'services/BreweryService'

const useBreweries = (page: number, perPage: number) =>
  useQuery(['breweries', page, perPage], () => breweries(page, perPage))

export default useBreweries
