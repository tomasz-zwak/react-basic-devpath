import OptimizedState from 'components/OptimizedState'
import StaleClosure from 'components/StaleClosure'
import { Flex } from 'layouts/Flex'
import React from 'react'

const Examples = () => {
  return (
    <Flex>
      <StaleClosure />
      <OptimizedState />
    </Flex>
  )
}

export default Examples
