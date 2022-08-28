import useCheckboxHandler from 'hooks/use-checkbox'
import React, { ChangeEvent, useId } from 'react'

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string
  onChecked?: (e?: ChangeEvent<HTMLInputElement>) => void
  onUnchecked?: (e?: ChangeEvent<HTMLInputElement>) => void
}

const Checkbox: React.FC<Props> = ({
  label,
  onChecked,
  onUnchecked,
  ...props
}) => {
  const id = useId()
  const checkboxHandler = useCheckboxHandler()
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        {...props}
        onChange={checkboxHandler({ onChecked, onUnchecked })}
        type="checkbox"
        name={label}
        id={id}
      />
    </div>
  )
}

export default Checkbox
