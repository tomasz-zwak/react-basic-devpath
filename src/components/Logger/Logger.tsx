import './Logger.scss'

import classNames from 'classnames'
import { LoggerContext, LoggerMessage } from 'components/Logger/LoggerContext'
import React, { useContext } from 'react'
import { createPortal } from 'react-dom'

const Logger = () => {
  const { messages } = useContext(LoggerContext)
  return createPortal(
    <div className={classNames({ logger: true })}>
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
    <span
      style={{ display: 'inline-block' }}
    >{`[${context}][${date}] ${msg}`}</span>
  )
}

export default Logger
