import { OK } from 'http-status'
import { Context } from 'koa'
import { object } from 'testdouble'
import { errorMiddleware } from './error.middleware'

describe('errorMiddleware', () => {
  it('does nothing if next is successful', async () => {
    const ctx = object<Context>()
    ctx.status = OK
    const next = jest.fn()
    await errorMiddleware(ctx, next)
    expect(ctx.status).toEqual(OK)
  })
})