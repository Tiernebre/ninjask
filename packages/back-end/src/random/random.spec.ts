import { getRandomInt, getSetOfRandomIntegers } from "./random";

describe("random", () => {
  afterEach(() => {
    jest.spyOn(global.Math, "random").mockRestore();
  });

  describe("getRandomInt", () => {
    beforeEach(() => {
      jest.spyOn(global.Math, "random").mockReturnValue(0.5);
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

  describe("getSetOfRandomIntegers", () => {
    it("returns a size of random integers as specified", () => {
      const size = 5;
      const randomIntegers = getSetOfRandomIntegers({
        min: 0,
        max: Number.MAX_SAFE_INTEGER,
        size,
      });
      expect(randomIntegers.size).toEqual(size);
    });

    it("throws an error if the size is lesser than the range", () => {
      expect(() =>
        getSetOfRandomIntegers({
          min: 0,
          max: 1,
          size: 2,
        })
      ).toThrowError();
    });

    it("does not throw an error if the size is equal to the range", () => {
      expect(() =>
        getSetOfRandomIntegers({
          min: 0,
          max: 10,
          size: 10,
        })
      ).not.toThrowError();
    });

    it("does not throw an error if the size is lesser than the range", () => {
      expect(() =>
        getSetOfRandomIntegers({
          min: 0,
          max: 10,
          size: 9,
        })
      ).not.toThrowError();
    });

    it("does not generate a number that is on a provided deny list", () => {
      jest.spyOn(global.Math, "random")
        .mockReturnValueOnce(0.5)
        .mockReturnValueOnce(0.75)
        .mockReturnValue(0.25);
      const integers = getSetOfRandomIntegers({
        min: 1,
        max: 10,
        size: 2,
        denyList: [5],
      });
      expect(integers).not.toContain(5);
    });
  });
});
