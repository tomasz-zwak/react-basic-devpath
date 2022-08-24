// src/mocks/handlers.js

import { rest } from 'msw'

export const handlers = [
  // Handles a GET /user request
  rest.get(`http://localhost:4000/users`, (req, res, ctx) => {
    return res(
      ctx.delay(1500),
      ctx.status(200),
      ctx.json([
        {
          name: 'John Doe',
          age: '99',
          email: 'jdoe@example.com',
          photos: [],
          id: 1,
        },
      ])
    )
  }),
]
