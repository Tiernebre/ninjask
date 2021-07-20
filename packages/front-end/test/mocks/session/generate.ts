import { Session } from "../../../src/api";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";
import { generateRandomNumber } from "../../random/random";

const generateAccessToken = (): string => {
  return jwt.sign(
    {
      userId: generateRandomNumber(),
      accessKey: uuid(),
      userFingerprint: uuid(),
    },
    "Test_Secret_Shhhhh",
    {
      expiresIn: "10 minutes",
    }
  );
};

const generateAccessTokenExpiration = (): number => {
  const date = new Date();
  date.setMinutes(date.getMinutes() + 20);
  return date.getTime() / 1000;
};

export const generateMockSession = (): Session => ({
  accessToken: generateAccessToken(),
  accessTokenExpiration: generateAccessTokenExpiration(),
});
