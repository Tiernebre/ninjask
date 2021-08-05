import { v4 } from "uuid";
import { SeasonEntity } from "./season.entity";
import { SeasonRepository } from "./season.repository";

export const seedSeasons = async (
  repository: SeasonRepository,
  leagueId: number,
  count = 20
): Promise<SeasonEntity[]> => {
  const seasons = [];
  for (let i = 0; i < count; i++) {
    const season = repository.create({
      name: v4(),
      description: v4(),
      leagueId,
    });
    seasons.push(season);
  }
  return repository.save(seasons);
};

export const seedSeason = async (
  repository: SeasonRepository,
  leagueId: number
): Promise<SeasonEntity> => {
  const [season] = await seedSeasons(repository, leagueId, 1);
  return season;
};
