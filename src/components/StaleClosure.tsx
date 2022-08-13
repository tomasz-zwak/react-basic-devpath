import React, { useEffect, useState } from 'react'

interface Props {
  fixed?: boolean
}
const StaleClosure: React.FC<Props> = ({ fixed }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!fixed) {
      const intervalId = setInterval(
        () => console.log(`Current count is: ${count}`),
        1000
      )
      return () => clearInterval(intervalId)
    }
  }, [fixed])

  useEffect(() => {
    if (fixed) {
      const intervalId = setInterval(
        () => console.log(`Current count is: ${count}`),
        1000
      )
      return () => {
        clearInterval(intervalId)
      }
    }
  }, [count, fixed])

  return (
    <div>
      <button
        onClick={() => setCount((count) => count + 1)}
      >{`Counter: ${count}`}</button>
    </div>
  )
}

export default StaleClosure
