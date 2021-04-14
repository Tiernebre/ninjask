import { getRandomArbitrary } from './random'

describe('random', () => {
  describe('getRandomArbitrary', () => {
    it('returns an integer', () => {
      const retval = getRandomArbitrary(1, 10)
      expect(typeof retval).toEqual('number')
    })
  })
})
