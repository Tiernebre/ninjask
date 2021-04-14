import { getRandomInt } from './random'

describe('random', () => {
  describe('getRandomInt', () => {
    beforeEach(() => {
      const mockMath: Math = Object.create(global.Math) as Math;
      mockMath.random = () => 0.5;
      global.Math = mockMath;
    })

    it('returns an integer', () => {
      const retval = getRandomInt(1, 10)
      expect(typeof retval).toEqual('number')
    })

    it('returns properly calculated number given a fixed random seed', () => {
      const retval = getRandomInt(1, 10)
      expect(retval).toEqual(5)
    })

    it('returns properly calculated number with floating point min and max', () => {
      const retval = getRandomInt(1.43, 10.65)
      expect(retval).toEqual(6)
    })

    it('returns properly calculated number with exact same min and max', () => {
      const retval = getRandomInt(1, 1)
      expect(retval).toEqual(1)
    })

    it('throws an error if min is greater than max', () => {
      expect(() => getRandomInt(2, 1)).toThrowError()
    })
  })
})
