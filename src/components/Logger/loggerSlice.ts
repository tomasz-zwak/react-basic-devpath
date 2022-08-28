import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'redux/store'

interface LoggerState {
  messages: Array<{ context: string; date: string; message: string }>
  contexts: string[]
  isVisible: boolean
}

export interface LoggerMessage {
  context: string
  date: Date
  message: string
}

export type LoggerMessageInput = Omit<LoggerMessage, 'date'>

const initialState: LoggerState = {
  messages: [],
  contexts: [],
  isVisible: false,
}

export const loggerSlice = createSlice({
  name: 'logger',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<LoggerMessageInput>) => {
      state.messages.push({
        ...action.payload,
        date: new Date().toString(),
      })
      if (!state.contexts.includes(action.payload.context))
        state.contexts.push(action.payload.context)
    },
    clear: (state) => {
      state.messages = []
    },
    setVisible: (state, action: PayloadAction<boolean>) => {
      state.isVisible = action.payload
    },
  },
})

export const { addMessage, clear, setVisible } = loggerSlice.actions

export const loggerReducer = loggerSlice.reducer

export const selectMessages = (state: RootState): LoggerMessage[] => {
  return state.logger.messages.map((message) => ({
    ...message,
    date: new Date(message.date),
  }))
}
