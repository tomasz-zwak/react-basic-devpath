import './spinner.scss'

import classNames from 'classnames'
import React from 'react'

const Spinner = ({ size }: { size: 'small' | 'medium' | 'large' }) => {
  return (
    <div
      role={'progressbar'}
      className={classNames('loader', {
        '-small': size === 'small',
        '-medium': size === 'medium',
        '-large': size === 'large',
      })}
    />
  )
}

export default Spinner
