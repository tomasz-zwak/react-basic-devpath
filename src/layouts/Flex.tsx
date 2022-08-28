import './Flex.scss'

import classNames from 'classnames'
import React, { ReactNode } from 'react'

interface FlexProps {
  direction?: 'row' | 'column'
  style?: React.CSSProperties
  children?: ReactNode
}

export const Flex: React.FC<FlexProps> = ({ style, children, direction }) => {
  return (
    <div
      style={{ flexDirection: direction, ...style }}
      className={classNames({
        flex: true,
      })}
    >
      {children}
    </div>
  )
}
