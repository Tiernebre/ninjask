import { sessionMiddleware } from './session.middleware'
import { object } from 'testdouble'
import { SessionService } from './session.service'
import { Context, Next } from 'koa'
import { UNAUTHORIZED } from 'http-status'

describe('sessionMiddleware', () => {
  let sessionService: SessionService
  let sessionMiddlewareToTest: (ctx: Context, next: Next) => Promise<void>

  beforeEach(() => {
    sessionService = object<SessionService>()
    sessionMiddlewareToTest = sessionMiddleware(sessionService)
  })

  it("throws error if no credentials are provided", async () => {
    const mockCtx = object<Context>()
    const mockNext = jest.fn()
    mockCtx.header = {
      authorization: undefined
    }
    await expect(sessionMiddlewareToTest(mockCtx, mockNext)).rejects.toThrowError()
    expect(mockCtx.status).toEqual(UNAUTHORIZED)
  })
})