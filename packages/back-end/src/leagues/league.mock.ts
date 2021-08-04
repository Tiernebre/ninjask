import { LeagueEntity } from "./league.entity";
import { generateRandomNumber, generateRandomString } from "../random";
import { League } from "./league";
import { CreateLeagueRequest } from "./create-league-request";

export const generateMockLeagueEntity = (): LeagueEntity => {
  const leagueEntity = new LeagueEntity();
  leagueEntity.id = generateRandomNumber();
  leagueEntity.name = `Mock League ${generateRandomString()}`;
  leagueEntity.description = `Just a mock league. ${generateRandomString()}`;
  leagueEntity.creatorId = generateRandomNumber();
  return leagueEntity;
};

export const generateMockLeague = (): League => ({
  id: generateRandomNumber(),
  name: `Mock League ${generateRandomString()}`,
  description: `Just a mock league. ${generateRandomString()}`,
  creatorId: generateRandomNumber(),
});

export const generateMockCreateLeagueRequest = (): CreateLeagueRequest => ({
  name: `Mock League ${generateRandomString()}`.substring(0, 5),
  description: `Just a mock league. ${generateRandomString()}`.substring(
    0,
    120
  ),
});
