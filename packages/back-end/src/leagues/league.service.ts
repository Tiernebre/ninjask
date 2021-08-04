import { Repository } from "typeorm";
import { Logger } from "../logger";
import {
  CreateLeagueRequest,
  createLeagueRequestSchema,
} from "./create-league-request";
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
    return foundLeagues.map((league) => this.map(league));
  }

  public async createOne(
    request: CreateLeagueRequest,
    creatorId: number
  ): Promise<League> {
    createLeagueRequestSchema.parse(request);

    const leagueToSave = this.leagueRepository.create({
      ...request,
      creatorId,
    });
    const createdLeague = await this.leagueRepository.save(leagueToSave);
    return this.map(createdLeague);
  }

  private map(entity: LeagueEntity): League {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      creatorId: entity.creatorId,
    };
  }
}
