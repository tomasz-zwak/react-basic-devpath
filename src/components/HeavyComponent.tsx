import { Flex } from 'layouts/Flex'
import React, { useEffect } from 'react'
import complexCalculation from 'utils/complex-calculation'

const HeavyComponent = ({ onClick }: { onClick: () => void }) => {
  useEffect(() => {
    console.log('Rendered: HeavyComponent, memoized click handler has changed')
  }, [onClick])

  useEffect(() => {
    console.log('Rendered: HeavyComponent')
  }, [])

  const processComplexCalc = () => {
    return complexCalculation('HeavyComponent', 20000000)
  }

  return (
    <Flex
      direction="column"
      style={{ border: '1px solid red', margin: 5, padding: 5 }}
    >
      <strong>HeavyComponent</strong>
      <div>Component dependent on function, process result:</div>
      {processComplexCalc().substring(0, 10)}
      <button type="button" onClick={onClick}>
        Do something
      </button>
    </Flex>
  )
}

export default React.memo(HeavyComponent)
