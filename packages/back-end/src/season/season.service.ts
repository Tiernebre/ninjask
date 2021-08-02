import { Repository } from "typeorm";
import { Season } from "./season";
import { SeasonEntity } from "./season.entity";

export class SeasonService {
  constructor(private readonly repository: Repository<SeasonEntity>) {}

  public async getAll(): Promise<Season[]> {
    return (await this.repository.find()).map((entity) => this.map(entity));
  }

  private map(entity: SeasonEntity): Season {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
    };
  }
}
