import { getRandomInt, getSetOfRandomIntegers } from "./random";

describe("random", () => {
  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  })

  describe("getRandomInt", () => {
    beforeEach(() => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
    });

    it("returns an integer", () => {
      const retval = getRandomInt(1, 10);
      expect(typeof retval).toEqual("number");
    });

    it("returns properly calculated number given a fixed random seed", () => {
      const retval = getRandomInt(1, 10);
      expect(retval).toEqual(5);
    });

    it("returns properly calculated number with floating point min and max", () => {
      const retval = getRandomInt(1.43, 10.65);
      expect(retval).toEqual(6);
    });

    it("returns properly calculated number with exact same min and max", () => {
      const retval = getRandomInt(1, 1);
      expect(retval).toEqual(1);
    });

    it("throws an error if min is greater than max", () => {
      expect(() => getRandomInt(2, 1)).toThrowError();
    });
  });

  describe('getSetOfRandomIntegers', () => {
    it("returns a size of random integers as specified", () => {
      const size = 5
      const randomIntegers = getSetOfRandomIntegers({
        min: 0,
        max: Number.MAX_SAFE_INTEGER,
        size
      })
      expect(randomIntegers.size).toEqual(size)
    })
  })
});
