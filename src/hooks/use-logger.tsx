import {
  addMessage,
  clear as clearLogger,
  setVisible as setLoggerVisible,
} from 'components/Logger/loggerSlice'
import { useAppDispatch } from 'redux/hooks'

const useLogger = (context = 'Default Context') => {
  const dispatch = useAppDispatch()

  const clear = () => {
    dispatch(clearLogger())
  }
  const setVisible = (isVisible: boolean) => {
    dispatch(setLoggerVisible(isVisible))
  }

  const log = (message: string) => {
    dispatch(addMessage({ context, message }))
  }

  return { log, clear, setVisible }
}

export default useLogger
