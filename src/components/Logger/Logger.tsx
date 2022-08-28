import './Logger.scss'

import classNames from 'classnames'
import Checkbox from 'components/Checkbox'
import {
  loggerSummary,
  logsCurrentDay,
  logsCurrentMinute,
  logsCurrentSecond,
} from 'components/Logger/loggerSelector'
import { LoggerMessage, selectMessages } from 'components/Logger/loggerSlice'
import useLogger from 'hooks/use-logger'
import { Flex } from 'layouts/Flex'
import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useAppSelector } from 'redux/hooks'

const Logger = () => {
  const { isVisible } = useAppSelector((state) => state.logger)
  const state = useAppSelector((state) => state)
  const messages = selectMessages(state)
  const { setVisible, clear } = useLogger()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ref.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const printLoggerSummary = () => {
    console.log('Logs today: ')
    console.table(logsCurrentDay(state))
    console.log('Logs this minute: ')
    console.table(logsCurrentMinute(state))
    console.log('Logs this second: ')
    console.table(logsCurrentSecond(state))
    console.log('Summary: ')
    console.table(loggerSummary(state))
  }

  return (
    <>
      {createPortal(
        <div
          style={{
            position: 'fixed',
            backgroundColor: 'white',
            bottom: 0,
            right: 0,
            margin: 5,
            width: 'auto',
          }}
        >
          <Flex direction="column">
            <Checkbox
              checked={isVisible}
              label="Show logger"
              onChecked={() => setVisible(true)}
              onUnchecked={() => setVisible(false)}
            />
            <button type="button" onClick={clear}>
              clear
            </button>
            <button type="button" onClick={printLoggerSummary}>
              Print Summary
            </button>
          </Flex>
        </div>,
        document.body
      )}
      {isVisible &&
        createPortal(
          <div
            data-testid="logger"
            style={{ backgroundColor: 'darkgreen' }}
            ref={ref}
            className={classNames({ logger: true })}
          >
            {messages.map((msg) => (
              <LoggerMsg key={msg.date.getTime()} message={msg} />
            ))}
          </div>,
          document.body
        )}
    </>
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
