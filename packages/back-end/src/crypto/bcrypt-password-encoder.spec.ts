import { BCryptPasswordEncoder } from "./bcrypt-password-encoder";
import bcrypt from 'bcrypt'

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

  describe("compare", () => {
    it('returns true if the raw password matches the encoded stored password', async () => {
      const rawPassword = 'someTestPassword123!'
      const encodedPassword = await bcrypt.hash(rawPassword, 12)
      await expect(bcryptPasswordEncoder.matches(rawPassword, encodedPassword)).resolves.toEqual(true)
    })

    it('returns false if the raw password does not match the encoded stored password', async () => {
      const rawPassword = 'someTestPassword123!'
      const encodedPassword = await bcrypt.hash(rawPassword + 'actually NOT', 12)
      await expect(bcryptPasswordEncoder.matches(rawPassword, encodedPassword)).resolves.toEqual(false)
    })
  })
});
