import useCheckboxHandler from 'hooks/use-checkbox'
import React, { useId } from 'react'

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string
  onChecked?: () => void
  onUnchecked?: () => void
}

const Checkbox: React.FC<Props> = ({ label, onChecked, onUnchecked }) => {
  const id = useId()
  const checkboxHandler = useCheckboxHandler()
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        type="checkbox"
        id={id}
        onChange={checkboxHandler({ onChecked, onUnchecked })}
      />
    </>
  )
}

export default Checkbox
