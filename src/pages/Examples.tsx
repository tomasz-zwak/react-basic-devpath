import StaleClosure from 'components/StaleClosure'
import useCheckboxHandler from 'hooks/use-checkbox'
import { Flex } from 'layouts/Flex'
import React, { useId, useState } from 'react'

const Examples = () => {
  const [isStaleClosureFixed, setStaleClosureFixed] = useState(false)

  const staleClosureStateSwitchId = useId()

  const checkboxHandler = useCheckboxHandler()
  return (
    <Flex>
      <label htmlFor={staleClosureStateSwitchId}>Fixed</label>
      <input
        type="checkbox"
        name="Fixed"
        id={staleClosureStateSwitchId}
        onChange={checkboxHandler({
          onChecked: () => setStaleClosureFixed(true),
          onUnchecked: () => setStaleClosureFixed(false),
        })}
      />
      <StaleClosure fixed={isStaleClosureFixed} />
    </Flex>
  )
}

export default Examples
