import { isProduction } from "./environment";

describe("environment", () => {
  beforeEach(() => {
    delete process.env.NODE_ENV;
  });

  describe("isProduction", () => {
    it("returns false if NODE_ENV is not set", () => {
      expect(isProduction()).toEqual(false);
    });

    it.each(["", "development", "dev", "test", "TEST", "DEV"])(
      "returns false if NODE_ENV equals %p",
      (env: string) => {
        process.env.NODE_ENV = env;
        expect(isProduction()).toEqual(false);
      }
    );

    it.each(["production", "Production", "PRODUCTION"])(
      "returns true if NODE_ENV equals %p",
      (env: string) => {
        process.env.NODE_ENV = env;
        expect(isProduction()).toEqual(true);
      }
    );
  });
});
