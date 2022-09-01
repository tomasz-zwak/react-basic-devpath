import Spinner from 'components/spinner'
import React from 'react'
import { createPortal } from 'react-dom'

const LoadingIndicator = ({ visible }) => {
  if (!visible) return null
  return createPortal(
    <div style={{ position: 'fixed', top: 5, right: 5 }}>
      <Spinner size="small" />
    </div>,
    document.body
  )
}

export default LoadingIndicator
