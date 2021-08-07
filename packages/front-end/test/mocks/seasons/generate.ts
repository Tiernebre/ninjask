import { Season } from "../../../src/api";
import { generateRandomNumber, generateRandomString } from "../../random";

export const generateSeason = (): Season => ({
  id: generateRandomNumber(),
  name: generateRandomString(),
  description: generateRandomString(),
});

export const generateSeasons = (): Season[] => {
  const seasons = [];
  for (let i = 0; i < 20; i++) {
    seasons.push(generateSeason());
  }
  return seasons;
};
