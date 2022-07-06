import axios from 'axios'
import { useEffect, useState } from 'react'

// at the time of developing this api stopped working
// object below serves as a fallback
const FALLBACK_DATA = [
  {
    id: 1,
    name: 'Beer 1',
    brand: 'Brand 1',
    alcohol: '4.0',
  },
  {
    id: 2,
    name: 'Beer 1',
    brand: 'Brand 1',
    alcohol: '4.0',
  },
  {
    id: 3,
    name: 'Beer 1',
    brand: 'Brand 1',
    alcohol: '4.0',
  },
  {
    id: 4,
    name: 'Beer 1',
    brand: 'Brand 1',
    alcohol: '4.0',
  },
  {
    id: 5,
    name: 'Beer 1',
    brand: 'Brand 1',
    alcohol: '4.0',
    details: 'a perfect mix',
  },
  {
    id: 6,
    name: 'Beer 1',
    brand: 'Brand 1',
    alcohol: '4.0',
  },
]

export const useBeers = (size = 10) => {
  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()

  useEffect(() => {
    setLoading(true)
    console.log('fetching data')
    axios
      .get(`https://random-data-api.com/api/beer/random_beer?size=${size}`, {
        timeout: 1000,
      })
      .then((response) => {
        setData(response.data)
      })
      .catch((err) => {
        setError(err.message)
        setData(FALLBACK_DATA.slice(0, size)) //workaround - api unresponsive
      })
      .finally(() => setLoading(false))
  }, [size])

  return { data, loading, error }
}

export default useBeers
