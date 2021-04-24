import { isProduction } from './environment'

describe('environment', () => {
  beforeEach(() => {
    delete process.env.NODE_ENV
  })

  describe('isProduction', () => {
    it('returns false if NODE_ENV is not set', () => {
      expect(isProduction()).toEqual(false)
    })
  })
})