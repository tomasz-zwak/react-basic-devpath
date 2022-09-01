import { useEffect, useState } from 'react'

const useCounter = (timePeriod: number) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(
      () => setCount((count) => count + 1),
      timePeriod
    )
    return () => clearInterval(intervalId)
  }, [timePeriod])

  return count
}

export default useCounter
