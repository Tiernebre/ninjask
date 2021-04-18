import { Logger } from "pino"
import { loggingMiddleware } from './logging.middleware'
import { object, verify } from 'testdouble'
import { Context, Next } from "koa"

describe('logging-middleware', () => {
  let middleware: (ctx: Context, next: Next) => Promise<void>
  let logger: Logger

  beforeEach(() =>  {
    logger = object<Logger>()
    middleware = loggingMiddleware(logger)
  })

  describe('loggingMiddleware', () => {
    it('logs the correct information for a successful operation', async () => {
      const ctx = object<Context>()
      ctx.method = 'GET'
      ctx.protocol = 'HTTP'
      ctx.path = '/test'
      const next = jest.fn()
      await middleware(ctx, next)
      verify(logger.info(`Received ${ctx.method} ${ctx.protocol} Request for ${ctx.path}`))
      verify(logger.info(`Finished ${ctx.method} Request.`))
    })

    it('logs the correct information for a failed operation', async () => {
      const ctx = object<Context>()
      ctx.method = 'GET'
      ctx.protocol = 'HTTP'
      ctx.path = '/test'
      const error = new Error('test expected error')
      const next = jest.fn().mockRejectedValue(error)
      await middleware(ctx, next)
      verify(logger.info(`Received ${ctx.method} ${ctx.protocol} Request for ${ctx.path}`))
      verify(logger.error(error))
    })
  })
})
