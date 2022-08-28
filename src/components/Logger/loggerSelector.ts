import { createSelector } from '@reduxjs/toolkit'
import { selectMessages } from 'components/Logger/loggerSlice'
import { isThisMinute, isThisSecond, isToday } from 'date-fns'
import { RootState } from 'redux/store'

const selectContexts = (state: RootState) => state.logger.contexts

const logsCurrentDay = createSelector(selectMessages, (logs) =>
  logs.filter(({ date }) => isToday(date))
)

const logsCurrentMinute = createSelector(selectMessages, (logs) =>
  logs.filter(({ date }) => isThisMinute(date))
)

const logsCurrentSecond = createSelector(selectMessages, (logs) =>
  logs.filter(({ date }) => isThisSecond(date))
)

const loggerSummary = createSelector(
  selectMessages,
  selectContexts,
  logsCurrentDay,
  logsCurrentMinute,
  logsCurrentSecond,
  (logs, contexts, logsToday, logsMinute, logsSecond) => ({
    totalLogs: logs.length,
    totalContexts: contexts.length,
    logsToday: logsToday.length,
    logsThisMinute: logsMinute.length,
    logsThisSecond: logsSecond.length,
  })
)
export { loggerSummary, logsCurrentDay, logsCurrentMinute, logsCurrentSecond }
