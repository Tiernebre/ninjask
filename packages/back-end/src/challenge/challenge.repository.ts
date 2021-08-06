import { EntityRepository, Repository } from "typeorm";
import { ChallengeEntity } from "./challenge.entity";

@EntityRepository(ChallengeEntity)
export class ChallengeRepository extends Repository<ChallengeEntity> {
  public async findAllForUserWithId(id: number): Promise<ChallengeEntity[]> {
    return this.createQueryBuilder("challenge")
      .innerJoin("challenge.participants", "participant")
      .innerJoin("participant.user", "user")
      .where("user.id = :id", { id })
      .getMany();
  }
}
