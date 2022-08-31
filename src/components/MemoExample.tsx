import HeavyComponent from 'components/HeavyComponent'
import Input from 'components/Input'
import React, { useEffect, useMemo, useState } from 'react'
import complexCalculation from 'utils/complex-calculation'

interface Props {
  rounds: number
}

const MemoExample = () => {
  const [rounds, setRounds] = useState(0)
  const [toggleCallback, setToggleCallback] = useState(false)

  const clickHandler = React.useCallback(
    () => console.log('Function that always produces the same result'),
    [toggleCallback]
  )

  useEffect(() => {
    console.log('Updated MemoExample state')
  }, [toggleCallback])

  return (
    <div>
      <p>Memo example</p>
      <button type="button" onClick={() => setToggleCallback(!toggleCallback)}>
        re-render callback
      </button>
      <Input
        label="Rounds"
        type="number"
        defaultValue={rounds}
        onChange={(e) => setRounds(parseInt(e.target.value))}
      />
      <MemoComponent rounds={rounds} />
      {/* 
          HeavyComponent is wrapped in React.memo() and callback 
          fn is memoized using useCallback so component doesn't 
          rerender when parent rerenders (rounds change)
          Without both of these HeavyComponent would perform unnecessary
          re-render whenever parent state changes (even though callback function did not change)
      */}
      <HeavyComponent onClick={clickHandler} />
    </div>
  )
}

const MemoComponent: React.FC<Props> = ({ rounds }) => {
  // without useMemo complex function would be called every time
  // MemoComponent rerenders (every button click)
  const result = useMemo(
    () => complexCalculation('MemoComponent', rounds),
    [rounds]
  )

  useEffect(() => {
    console.log('Memo Component rendered!')
  })

  return (
    <div style={{ border: '1px solid green', margin: 5, padding: 5 }}>
      <strong>MemoComponent</strong>
      <div>{`Result: ${result.substring(0, 10)}`}</div>
    </div>
  )
}

export default MemoExample
