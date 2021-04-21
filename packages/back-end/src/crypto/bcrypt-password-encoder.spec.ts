import { BCryptPasswordEncoder } from "./bcrypt-password-encoder";

describe("bcrypt-password-encoder", () => {
  let bcryptPasswordEncoder: BCryptPasswordEncoder;

  beforeEach(() => {
    bcryptPasswordEncoder = new BCryptPasswordEncoder();
  });

  describe("encode", () => {
    it("returns an encoded password that is different from the raw password provided", async () => {
      const rawPassword = "someTestPassword456!";
      const encodedPassword = await bcryptPasswordEncoder.encode(rawPassword);
      expect(encodedPassword).not.toEqual(rawPassword);
    });
  });
});
