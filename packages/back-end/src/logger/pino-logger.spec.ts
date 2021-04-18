jest.mock('pino', () => jest.fn())

import Pino from "pino";
import { PinoLogger } from './pino-logger'

const mockedPino = (Pino as unknown) as jest.Mock;

describe('pino-logger', () => {
  let pinoLogger: PinoLogger

  const mockPino = {
    info: jest.fn(),
    error: jest.fn()
  }

  beforeEach(() => {
    mockedPino.mockReturnValue(mockPino)
    pinoLogger = new PinoLogger()
  })

  describe('info', () => {
    it('calls pino info', () => {
      const message = 'Expected Info Message'
      pinoLogger.info(message)
      expect(mockPino.info).toHaveBeenCalledWith(message)
    })
  })
})