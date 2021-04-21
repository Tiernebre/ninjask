import { PasswordEncoder } from "./password-encoder";

export class BCryptPasswordEncoder implements PasswordEncoder {
  encode(rawPassword: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
  matches(rawPassword: string, encodedPassword: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

}