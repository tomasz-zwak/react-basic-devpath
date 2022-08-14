import Checkbox from 'components/Checkbox'
import { LoggerContext } from 'components/Logger/LoggerContext'
import React, { useContext, useEffect, useState } from 'react'

const StaleClosure = () => {
  const [count, setCount] = useState(0)

  const [fixed, setFixed] = useState(false)

  const { addMessage } = useContext(LoggerContext)

  const logCount = (count: number) => {
    console.log(`Current count is: ${count}`)
    addMessage({
      context: StaleClosure.name,
      message: `Current count is: ${count}`,
    })
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
    <div>
      <p>Stale Closure</p>
      <Checkbox
        label="Fixed"
        onChecked={() => {
          setFixed(true)
          addMessage({
            context: 'StaleClosure',
            message: 'Enabled fixed stale closure',
          })
        }}
        onUnchecked={() => {
          setFixed(false)
          addMessage({
            context: 'StaleClosure',
            message: 'Disabled fixed stale closure',
          })
        }}
      />
      <button
        onClick={() => setCount((count) => count + 1)}
      >{`Counter: ${count}`}</button>
    </div>
  )
}

export default StaleClosure
