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

export interface RandomIntegersSetConfiguration {
  // inclusive minimum
  min: number;
  // exclusive maximum
  max: number;
  // numbers that should be excluded from the set
  denyList?: number[];
  // the size of the set of numbers
  size: number;
}

export const getSetOfRandomIntegers = (
  configuration: RandomIntegersSetConfiguration
): Set<number> => {
  const { min, max, denyList = [], size } = configuration;

  const range = max - min
  if (size > range) {
    throw Error('Size must be smaller than the range provided')
  }

  const randomIntegers = new Set<number>();

  do {
    const randomInt = getRandomInt(min, max);
    if (!denyList.includes(randomInt)) {
      randomIntegers.add(randomInt);
    }
  } while (randomIntegers.size !== size);

  return randomIntegers;
};

export const generateRandomString = (): string => {
  return crypto.randomBytes(20).toString("hex");
};
