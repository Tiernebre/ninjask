import { PasswordEncoder } from "./password-encoder";
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 12

export class BCryptPasswordEncoder implements PasswordEncoder {
  encode(rawPassword: string): Promise<string> {
    return bcrypt.hash(rawPassword, SALT_ROUNDS)
  }

  matches(rawPassword: string, encodedPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, encodedPassword)
  }
}