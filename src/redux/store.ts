import { configureStore } from '@reduxjs/toolkit'
import { loggerReducer } from 'components/Logger/loggerSlice'

export const store = configureStore({
  reducer: {
    logger: loggerReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppStore = typeof store
