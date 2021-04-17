import { Repository } from "typeorm";
import { Logger } from "../logger";
import { League } from "./league";
import { LeagueEntity } from "./league.entity";

export class LeagueService {
  constructor(
    private readonly leagueRepository: Repository<LeagueEntity>,
    private readonly logger: Logger
  ) {}

  public async getAll(): Promise<League[]> {
    this.logger.info("Retrieving all of the leagues.");
    const foundLeagues = await this.leagueRepository.find();
    return foundLeagues.map((league) => ({
      id: league.id,
      name: league.name,
      description: league.description,
    }));
  }
}
