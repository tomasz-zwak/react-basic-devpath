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
    <Input
      defaultValue={calculation}
      label="Optimized State"
      style={{ width: '5em' }}
      onChange={(e) => setCalculation(e.target.value)}
    />
  )
}

export default OptimizedState
