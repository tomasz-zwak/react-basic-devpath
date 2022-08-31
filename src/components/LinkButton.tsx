import React, { PropsWithChildren } from 'react'

export const LinkButton: React.FC<
  PropsWithChildren & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      style={{
        border: 'none',
        padding: 0,
        font: 'inherit',
        cursor: 'pointer',
        textDecoration: 'underline',
        background: 'none',
      }}
    >
      {children}
    </button>
  )
}
