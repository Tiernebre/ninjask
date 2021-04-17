import crypto from "crypto";

export const getRandomInt = (min: number, max: number): number => {
  if (min > max) {
    throw new Error("min must be greater than max");
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};

export const generateRandomNumber = (): number => {
  return getRandomInt(0, Number.MAX_SAFE_INTEGER);
};

export const generateRandomString = (): string => {
  return crypto.randomBytes(20).toString("hex");
};
