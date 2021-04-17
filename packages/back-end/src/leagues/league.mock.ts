import { LeagueEntity } from "./league.entity";
import { generateRandomNumber, generateRandomString } from "../random";

export const generateMockLeagueEntity = (): LeagueEntity => {
  const leagueEntity = new LeagueEntity();
  leagueEntity.id = generateRandomNumber();
  leagueEntity.name = `Mock League ${generateRandomString()}`;
  leagueEntity.description = `Just a mock league. ${generateRandomString()}`;
  return leagueEntity;
};
