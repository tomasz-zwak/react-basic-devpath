import { addMessage, loggerReducer } from 'components/Logger/loggerSlice'

describe('LoggerReducer', () => {
  test('returns initial state', () => {
    expect(loggerReducer(undefined, { type: undefined })).toEqual({
      messages: [],
      contexts: [],
      isVisible: false,
    })
  })

  test('adds a message to store', () => {
    const prevState = {
      messages: [],
      contexts: [],
      isVisible: false,
    }
    expect(
      loggerReducer(
        prevState,
        addMessage({
          context: 'Test',
          message: 'test message',
        })
      )
    ).toEqual({
      messages: [
        {
          context: 'Test',
          message: 'test message',
          date: new Date().toString(),
        },
      ],
      contexts: ['Test'],
      isVisible: false,
    })
  })
})
