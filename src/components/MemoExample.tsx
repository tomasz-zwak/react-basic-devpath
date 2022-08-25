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
    () => complexCalculation('MemoExample', rounds),
    [toggleCallback]
  )

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
      <HeavyComponent onClick={clickHandler} />
    </div>
  )
}

const MemoComponent: React.FC<Props> = ({ rounds }) => {
  const result = useMemo(
    () => complexCalculation('MemoComponent', rounds),
    [rounds]
  )

  useEffect(() => {
    console.log('Memo Component rendered!')
  })

  return (
    <>
      <div>{`Result: ${result.substring(0, 10)}`}</div>
    </>
  )
}

export default MemoExample
