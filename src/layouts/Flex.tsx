import './Flex.scss'

import classNames from 'classnames'
import React, { ReactNode } from 'react'

interface FlexProps {
  style?: React.CSSProperties
  children?: ReactNode
}

export const Flex: React.FC<FlexProps> = ({ style, children }) => {
  return (
    <div
      style={{ ...style }}
      className={classNames({
        flex: true,
      })}
    >
      {children}
    </div>
  )
}
