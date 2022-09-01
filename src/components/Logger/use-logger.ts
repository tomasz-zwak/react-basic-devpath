import {
  LoggerContext,
  LoggerMessageInput,
} from 'components/Logger/LoggerContext'
import { useContext } from 'react'

const useLogger = (context: string) => {
  const { addMessage, ...rest } = useContext(LoggerContext)

  const log = (message: LoggerMessageInput['message']) => {
    addMessage({ context, message })
  }

  return { log, ...rest }
}

export default useLogger
