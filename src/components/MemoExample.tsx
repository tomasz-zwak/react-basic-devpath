import Checkbox from 'components/Checkbox'
import Input from 'components/Input'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import complexCalculation from 'utils/complex-calculation'

interface Props {
  rounds: number
  visible: boolean
}

const MemoExample = () => {
  const [rounds, setRounds] = useState(0)
  const [visible, setVisible] = useState(true)

  return (
    <div>
      <p>Memo example</p>
      <Checkbox
        label="Visible"
        onChecked={() => setVisible(true)}
        onUnchecked={() => setVisible(false)}
      />
      <Input
        label="Rounds"
        type="number"
        defaultValue={rounds}
        onChange={(e) => setRounds(parseInt(e.target.value))}
      />
      <MemoComponent visible={visible} rounds={rounds} />
    </div>
  )
}

const MemoComponent: React.FC<Props> = ({ rounds, visible }) => {
  const result = useMemo(() => complexCalculation(rounds), [rounds])
  const handleComplexCalc = useCallback(() => {
    console.log(`Finished complex calc, result: ${result}`)
  }, [visible])

  useEffect(() => {
    console.log('Memo Component rendered!')
  })

  return (
    <>
      <button
        style={{ visibility: visible ? 'visible' : 'hidden' }}
        tabIndex={-1}
        onClick={handleComplexCalc}
      >
        Press me
      </button>
      <ComponentDependentOnFunction handleComplexCalc={handleComplexCalc} />
    </>
  )
}

const ComponentDependentOnFunction = ({
  handleComplexCalc,
}: {
  handleComplexCalc: () => void
}) => {
  useEffect(() => {
    console.log('Rendered: ComponentDependentOnFunction')
  }, [handleComplexCalc])

  return (
    <div style={{ border: '1px solid red' }}>
      Component dependent on function
    </div>
  )
}

export default MemoExample
