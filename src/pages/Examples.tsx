import Checkbox from 'components/Checkbox'
import Divider from 'components/Divider'
import MemoExample from 'components/MemoExample'
import OptimizedState from 'components/OptimizedState'
import RedirectEffect from 'components/RedirectEffect'
import StaleClosure from 'components/StaleClosure'
import { Flex } from 'layouts/Flex'
import React, { useReducer } from 'react'

const initialState: ExamplesVisibilityState = {
  memoExample: false,
  optimizedState: false,
  redirectEffect: false,
  staleClosure: false,
}

interface ExamplesVisibilityState {
  staleClosure: boolean
  optimizedState: boolean
  memoExample: boolean
  redirectEffect: boolean
}

const examplesVisibilityReducer = (
  state: ExamplesVisibilityState,
  toggleExample: keyof ExamplesVisibilityState
) => {
  switch (toggleExample) {
    case 'memoExample':
      return { ...initialState, memoExample: true }
    case 'optimizedState':
      return { ...initialState, optimizedState: true }
    case 'redirectEffect':
      return { ...initialState, redirectEffect: true }
    case 'staleClosure':
      return { ...initialState, staleClosure: true }
    default:
      return state
  }
}

const Examples = () => {
  const [
    { memoExample, optimizedState, redirectEffect, staleClosure },
    dispatch,
  ] = useReducer(examplesVisibilityReducer, initialState)

  return (
    <>
      <Flex direction="column" style={{ alignItems: 'flex-start' }}>
        <Checkbox
          checked={staleClosure}
          label="Stale Closure"
          onChecked={() => dispatch('staleClosure')}
        />
        <Checkbox
          checked={optimizedState}
          label="Optimized State"
          onChecked={() => dispatch('optimizedState')}
        />
        <Checkbox
          checked={memoExample}
          label="Memo Example"
          onChecked={() => dispatch('memoExample')}
        />
        <Checkbox
          checked={redirectEffect}
          label="Redirect effect"
          onChecked={() => dispatch('redirectEffect')}
        />
      </Flex>
      <hr />
      <Flex
        style={{
          height: 200,
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        }}
      >
        {staleClosure && (
          <>
            <StaleClosure />
            <Divider />
          </>
        )}

        {optimizedState && (
          <>
            <OptimizedState />
            <Divider />
          </>
        )}

        {memoExample && (
          <>
            <MemoExample />
            <Divider />
          </>
        )}

        {redirectEffect && (
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
