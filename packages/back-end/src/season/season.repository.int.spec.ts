import { Repository, getRepository, getCustomRepository } from "typeorm";
import { establishDbConnection } from "../test/create-db-connection";
import { SeasonRepository } from "./season.repository";
import { LeagueEntity } from "../leagues";
import { seedLeagues } from "../leagues/league.seed";
import { seedUser } from "../user/user.seed";
import { UserEntity } from "../user";

describe("SeasonRepository", () => {
  let seasonRepository: SeasonRepository;
  let leagueRepository: Repository<LeagueEntity>;
  let userRepository: Repository<UserEntity>;

  beforeAll(async () => {
    await establishDbConnection();
  });

  beforeEach(async () => {
    leagueRepository = getRepository(LeagueEntity);
    seasonRepository = getCustomRepository(SeasonRepository);
    userRepository = getRepository(UserEntity);
    const creator = await seedUser(userRepository);
    await seedLeagues(leagueRepository, creator.id);
  });
});
