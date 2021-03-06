import { NotFoundError } from "../error";
import { Season } from "./season";
import { SeasonEntity } from "./season.entity";
import { SeasonRepository } from "./season.repository";

export class SeasonService {
  constructor(private readonly repository: SeasonRepository) {}

  public async getAll(): Promise<Season[]> {
    return (await this.repository.find()).map((entity) => this.map(entity));
  }

  public async getAllForLeague(leagueId: number): Promise<Season[]> {
    return (await this.repository.findAllWithLeagueId(leagueId)).map((entity) =>
      this.map(entity)
    );
  }

  public async getOneById(id: number): Promise<Season> {
    const foundSeason = await this.repository.findOne(id);
    if (!foundSeason) {
      throw new NotFoundError(`Season with id = ${id} not found.`);
    }
    return this.map(foundSeason);
  }

  private map(entity: SeasonEntity): Season {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
    };
  }
}
