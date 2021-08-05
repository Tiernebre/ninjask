import { Repository } from "typeorm";
import { v4 } from "uuid";
import { LeagueEntity } from "./league.entity";

export const seedLeagues = async (
  repository: Repository<LeagueEntity>,
  creatorId: number,
  count = 20
): Promise<LeagueEntity[]> => {
  const leagues = [];
  for (let i = 0; i < count; i++) {
    const league = repository.create({
      name: v4(),
      description: v4(),
      creatorId,
    });
    leagues.push(league);
  }
  return repository.save(leagues);
};

export const seedLeague = async (
  repository: Repository<LeagueEntity>,
  creatorId: number
): Promise<LeagueEntity> => {
  const [league] = await seedLeagues(repository, creatorId, 1);
  return league;
};
