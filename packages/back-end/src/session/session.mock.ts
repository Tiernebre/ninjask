import { generateRandomNumber, generateRandomString } from "../random";
import { Session } from "./session";
import { SessionPayload } from "./session-payload";

export const generateMockSession = (): Session => {
  return new Session(
    generateRandomString(),
    generateRandomString(),
    generateRandomNumber(),
    generateRandomString()
  );
};

export const generateMockSessionPayload = (): SessionPayload => {
  return {
    userId: generateRandomNumber(),
    accessKey: generateRandomString(),
    userFingerprint: generateRandomString(),
  };
};
