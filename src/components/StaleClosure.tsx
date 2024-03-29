import Checkbox from 'components/Checkbox'
import useLogger from 'components/Logger/use-logger'
import React, { useEffect, useState } from 'react'

const StaleClosure = () => {
  const [count, setCount] = useState(0)

  const [fixed, setFixed] = useState(false)

  const { log } = useLogger(StaleClosure.name)

  const logCount = (count: number) => {
    console.log(`Current count is: ${count}`)
    log(`Current count is: ${count}`)
  }

  useEffect(() => {
    if (!fixed) {
      const intervalId = setInterval(() => logCount(count), 1000)
      return () => clearInterval(intervalId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fixed])

  useEffect(() => {
    if (fixed) {
      const intervalId = setInterval(() => logCount(count), 1000)
      return () => {
        clearInterval(intervalId)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, fixed])

  return (
    <div data-testid="staleClosureContainer">
      <p>Stale Closure</p>
      <Checkbox
        checked={fixed}
        label="Fixed"
        onChecked={() => {
          setFixed(true)
          log('Enabled fixed stale closure')
        }}
        onUnchecked={() => {
          setFixed(false)
          log('Disabled fixed stale closure')
        }}
      />
      <button
        onClick={() => setCount((count) => count + 1)}
      >{`Counter: ${count}`}</button>
    </div>
  )
}

export default StaleClosure
