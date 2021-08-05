import { Repository, getRepository, getCustomRepository } from "typeorm";
import { establishDbConnection } from "../test/create-db-connection";
import { SeasonRepository } from "./season.repository";
import { LeagueEntity } from "../leagues";
import { seedLeague } from "../leagues/league.seed";
import { seedUser } from "../user/user.seed";
import { UserEntity } from "../user";
import { seedSeasons } from "./season.seed";
import { SeasonEntity } from "./season.entity";

describe("SeasonRepository", () => {
  let seasonRepository: SeasonRepository;
  let leagueRepository: Repository<LeagueEntity>;
  let userRepository: Repository<UserEntity>;
  let league: LeagueEntity;
  let seasons: SeasonEntity[];

  beforeAll(async () => {
    await establishDbConnection();
  });

  beforeEach(async () => {
    leagueRepository = getRepository(LeagueEntity);
    seasonRepository = getCustomRepository(SeasonRepository);
    userRepository = getRepository(UserEntity);
    const creator = await seedUser(userRepository);
    league = await seedLeague(leagueRepository, creator.id);
    const otherLeague = await seedLeague(leagueRepository, creator.id);
    seasons = await seedSeasons(seasonRepository, league.id);
    await seedSeasons(seasonRepository, otherLeague.id);
  });

  describe("getAllWithLeagueId", () => {
    it("returns the seasons tied with a given league id", async () => {
      const foundSeasons = await seasonRepository.getAllWithLeagueId(league.id);
      expect(foundSeasons).toEqual(seasons);
    });

    it("an empty array if given a non existent league id", async () => {
      const foundSeasons = await seasonRepository.getAllWithLeagueId(1000);
      expect(foundSeasons).toEqual([]);
    });
  });
});
