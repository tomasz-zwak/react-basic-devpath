import React, { useState } from 'react'

export interface LoggerMessage {
  context: string
  date: Date
  message: string
}

type LoggerMessageInput = Omit<LoggerMessage, 'date'>

interface LoggerContextParams {
  messages: LoggerMessage[]
  addMessage: (message: LoggerMessageInput) => void
  clear: () => void
}

export const LoggerContext = React.createContext<LoggerContextParams>(
  {} as LoggerContextParams
)

const LoggerContextProvider = ({ children }) => {
  const [messages, setMessages] = useState<LoggerMessage[]>([])

  const addMessage: LoggerContextParams['addMessage'] = (message) => {
    setMessages((msg) => [...msg, { ...message, date: new Date() }])
  }

  const clear = () => {
    setMessages([])
  }

  return (
    <LoggerContext.Provider value={{ messages, addMessage, clear }}>
      {children}
    </LoggerContext.Provider>
  )
}

export default LoggerContextProvider
