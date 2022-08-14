import './Logger.scss'

import classNames from 'classnames'
import { LoggerContext, LoggerMessage } from 'components/Logger/LoggerContext'
import React, { useContext, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const Logger = () => {
  const { messages } = useContext(LoggerContext)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current?.lastElementChild)
      ref.current.lastElementChild.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return createPortal(
    <div
      style={{ backgroundColor: 'darkgreen' }}
      ref={ref}
      className={classNames({ logger: true })}
    >
      {messages.map((msg) => (
        <LoggerMsg key={msg.date.getTime()} message={msg} />
      ))}
    </div>,
    document.body
  )
}

interface Props {
  message: LoggerMessage
}

const LoggerMsg: React.FC<Props> = ({ message }) => {
  const { context, date, message: msg } = message
  return (
    <span style={{ display: 'inline-block' }}>
      <span
        style={{ color: 'lightblue', marginRight: '.25em' }}
      >{`[${context}]`}</span>
      <span
        style={{ color: 'gray', marginRight: '.25em' }}
      >{`[${date.toLocaleTimeString()}]`}</span>
      <span style={{ color: 'black' }}>{msg}</span>
    </span>
  )
}

export default Logger