import { useQuery } from '@tanstack/react-query'

import { coalStock } from './coal-stock.service'

const useCoalStocks = () => useQuery(['coalStocks'], () => coalStock())

export default useCoalStocks
