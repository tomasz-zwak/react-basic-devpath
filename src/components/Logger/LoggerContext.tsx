import React, { useEffect, useState } from 'react'
import { useLocalStorage } from 'react-use'

export interface LoggerMessage {
  context: string
  date: Date
  message: string
}

export type LoggerMessageInput = Omit<LoggerMessage, 'date'>

interface LoggerContextParams {
  messages: LoggerMessage[]
  addMessage: (message: LoggerMessageInput) => void
  isVisible?: boolean
  setVisible: (isVisible: boolean) => void
  clear: () => void
}

export const LoggerContext = React.createContext<LoggerContextParams>(
  {} as LoggerContextParams
)

const LoggerContextProvider = ({ children }) => {
  const [messages, setMessages] = useState<LoggerMessage[]>([])

  const [isVisible, setVisible] = useLocalStorage('isLoggerVisible', false)

  useEffect(() => {
    if (isVisible) setVisible(true)
    if (!isVisible) setVisible(false)
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
