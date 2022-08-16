import Input from 'components/Input'
import { useEffect, useState } from 'react'
import React from 'react'
import complexCalculation from 'utils/complex-calculation'

const OptimizedState = () => {
  const [calculation, setCalculation] = useState(() =>
    complexCalculation(1000000)
  )

  useEffect(() => {
    console.log('State updated')
  }, [calculation])

  return (
    <div>
      <p>Optimized State</p>
      <Input
        defaultValue={calculation}
        label="state value"
        style={{ width: '5em' }}
        onChange={(e) => setCalculation(e.target.value)}
      />
    </div>
  )
}

export default OptimizedState
