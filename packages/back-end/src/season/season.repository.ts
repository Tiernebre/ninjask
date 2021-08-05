import { EntityRepository, Repository } from "typeorm";
import { SeasonEntity } from "./season.entity";

@EntityRepository(SeasonEntity)
export class SeasonRepository extends Repository<SeasonEntity> {
  async getAllWithLeagueId(leagueId: number): Promise<SeasonEntity> {}
}
