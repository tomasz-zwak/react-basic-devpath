import Checkbox from 'components/Checkbox'
import useLogger from 'hooks/use-logger'
import React, { useEffect, useState } from 'react'

const StaleClosure = () => {
  const [count, setCount] = useState(0)
  const { log } = useLogger(StaleClosure.name)

  const [fixed, setFixed] = useState(false)

  const logCount = (count: number) => {
    console.log(`Current count is: ${count}`)
    log(`Current count is: ${count}`)
    // log(`Current count is: ${count}`)
  }

  useEffect(() => {
    if (!fixed) {
      const intervalId = setInterval(() => logCount(count), 1000)
      return () => clearInterval(intervalId)
    }
  }, [fixed])

  useEffect(() => {
    if (fixed) {
      const intervalId = setInterval(() => logCount(count), 1000)
      return () => {
        clearInterval(intervalId)
      }
    }
  }, [count, fixed])

  return (
    <div data-testid="staleClosureContainer">
      <p>Stale Closure</p>
      <Checkbox
        label="Fixed"
        onChecked={() => {
          setFixed(true)
          // log('Enabled fixed stale closure')
        }}
        onUnchecked={() => {
          setFixed(false)
          // log('Disabled fixed stale closure')
        }}
      />
      <button
        onClick={() => setCount((count) => count + 1)}
      >{`Counter: ${count}`}</button>
    </div>
  )
}

export default StaleClosure
