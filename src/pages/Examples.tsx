import Checkbox from 'components/Checkbox'
import Divider from 'components/Divider'
import MemoExample from 'components/MemoExample'
import OptimizedState from 'components/OptimizedState'
import RedirectEffect from 'components/RedirectEffect'
import StaleClosure from 'components/StaleClosure'
import { DEFAULT_EXAMPLE_STATE } from 'constants/default-example-state'
import { Flex } from 'layouts/Flex'
import React, { useState } from 'react'

const Examples = () => {
  const [isStaleClosureEnabled, setStaleClosureEnabled] = useState(
    DEFAULT_EXAMPLE_STATE
  )
  const [isOptimizedStateEnabled, setOptimizedStateEnabled] = useState(
    DEFAULT_EXAMPLE_STATE
  )
  const [isMemoExampleEnabled, setMemoExampleEnabled] = useState(
    DEFAULT_EXAMPLE_STATE
  )

  const [isRedirectEffectEnabled, setRedirectEffectEnabled] = useState(
    DEFAULT_EXAMPLE_STATE
  )

  return (
    <>
      <Checkbox
        label="Stale Closure"
        onChecked={() => setStaleClosureEnabled(true)}
        onUnchecked={() => setStaleClosureEnabled(false)}
      />
      <Checkbox
        label="Optimized State"
        onChecked={() => setOptimizedStateEnabled(true)}
        onUnchecked={() => setOptimizedStateEnabled(false)}
      />
      <Checkbox
        label="Memo Example"
        onChecked={() => setMemoExampleEnabled(true)}
        onUnchecked={() => setMemoExampleEnabled(false)}
      />
      <Checkbox
        label="Redirect effect"
        onChecked={() => setRedirectEffectEnabled(true)}
        onUnchecked={() => setRedirectEffectEnabled(false)}
      />
      <hr />
      <Flex
        style={{
          height: 200,
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        }}
      >
        {isStaleClosureEnabled && (
          <>
            <StaleClosure />
            <Divider />
          </>
        )}

        {isOptimizedStateEnabled && (
          <>
            <OptimizedState />
            <Divider />
          </>
        )}
        {isMemoExampleEnabled && (
          <>
            <MemoExample />
            <Divider />
          </>
        )}
        {isRedirectEffectEnabled && (
          <>
            <RedirectEffect />
            <Divider />
          </>
        )}
      </Flex>
    </>
  )
}

export default Examples
