import React, { useEffect, useState } from 'react'

export interface LoggerMessage {
  context: string
  date: Date
  message: string
}

export type LoggerMessageInput = Omit<LoggerMessage, 'date'>

interface LoggerContextParams {
  messages: LoggerMessage[]
  addMessage: (message: LoggerMessageInput) => void
  isVisible: boolean
  setVisible: (isVisible: boolean) => void
  clear: () => void
}

export const LoggerContext = React.createContext<LoggerContextParams>(
  {} as LoggerContextParams
)
const LOGGER_KEY = 'isLoggerVisible'

const LoggerContextProvider = ({ children }) => {
  const [isVisible, setVisible] = useState(
    () => localStorage.getItem(LOGGER_KEY) === 'true'
  )
  const [messages, setMessages] = useState<LoggerMessage[]>([])

  useEffect(() => {
    if (isVisible) localStorage.setItem('isLoggerVisible', 'true')
    if (!isVisible) localStorage.setItem('isLoggerVisible', 'false')
  }, [isVisible])

  const addMessage: LoggerContextParams['addMessage'] = (message) => {
    setMessages((msg) => [...msg, { ...message, date: new Date() }])
  }

  const clear = () => {
    setMessages([])
  }

  return (
    <LoggerContext.Provider
      value={{ messages, addMessage: addMessage, clear, isVisible, setVisible }}
    >
      {children}
    </LoggerContext.Provider>
  )
}

export default LoggerContextProvider
