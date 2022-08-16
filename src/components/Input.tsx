import React, { useId } from 'react'

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string
}

const Input: React.FC<Props> = ({ label, ...props }) => {
  const id = useId()
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <br />
      <input type="text" id={id} {...props} />
    </div>
  )
}

export default Input
