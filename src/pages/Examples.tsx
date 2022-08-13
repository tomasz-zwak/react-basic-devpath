import { LoggerContext } from 'components/Logger/LoggerContext'
import StaleClosure from 'components/StaleClosure'
import useCheckboxHandler from 'hooks/use-checkbox'
import { Flex } from 'layouts/Flex'
import React, { useContext, useId, useState } from 'react'

const Examples = () => {
  const { addMessage } = useContext(LoggerContext)
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
          onChecked: () => {
            setStaleClosureFixed(true)
            addMessage({
              context: 'StaleClosure',
              message: 'Checkbox has been checked',
            })
          },
          onUnchecked: () => {
            setStaleClosureFixed(false)
            addMessage({
              context: 'StaleClosure',
              message: 'Checkbox has been unchecked',
            })
          },
        })}
      />
      <StaleClosure fixed={isStaleClosureFixed} />
    </Flex>
  )
}

export default Examples
