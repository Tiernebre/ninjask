import { SeasonEntity } from "./season.entity";
import { generateRandomNumber, generateRandomString } from "../random";
import { Season } from ".";

export const createSeasonEntity = (): SeasonEntity => {
  const seasonEntity = new SeasonEntity();
  seasonEntity.id = generateRandomNumber();
  seasonEntity.name = generateRandomString();
  seasonEntity.description = generateRandomString();
  return seasonEntity;
};

export const createSeason = (): Season => ({
  id: generateRandomNumber(),
  name: generateRandomString(),
  description: generateRandomString(),
});

export const createSeasons = (): Season[] => {
  const seasons = [];
  for (let i = 0; i < 20; i++) {
    seasons.push(createSeason());
  }
  return seasons;
};
