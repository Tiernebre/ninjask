
import { generateRandomNumber, generateRandomString } from "../random";
import { Session } from "./session";

export const generateMockSession = (): Session => {
  return new Session(
    generateRandomString(),
    generateRandomString(),
    generateRandomNumber(),
    generateRandomString()
  );
}