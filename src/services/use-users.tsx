import axios from 'axios'
import { useEffect, useState } from 'react'

export const useUsers = (size = 10) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    console.log('running api')
    axios
      .get(`https://random-data-api.com/api/beer/random_beer?size=${size}`)
      .then((response) => {
        setData(response.data)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }, [size])

  return { data, loading }
}

export default useUsers
