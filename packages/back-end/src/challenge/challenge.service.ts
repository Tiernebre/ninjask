import { Repository } from "typeorm";
import { Challenge } from "./challenge";
import { ChallengeEntity } from "./challenge.entity";

export class ChallengeService {
  constructor(
    private readonly challengeRepository: Repository<ChallengeEntity>
  ) {}

  async getOneById(id: number): Promise<Challenge> {
    const challenge = await this.challengeRepository.findOne(id);
    if (!challenge) {
      throw new Error(`Challenge was not found for id = ${id}`);
    }
    return this.mapFromEntity(challenge);
  }

  async getAllForUserWithId(id: number): Promise<Challenge[]> {
    const challenges = await this.challengeRepository
      .createQueryBuilder("challenge")
      .innerJoin("challenge.users", "user")
      .where("user.id = :id", { id })
      .getMany();
    return challenges.map((entity) => this.mapFromEntity(entity));
  }

  private mapFromEntity(entity: ChallengeEntity): Challenge {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      versionId: entity.versionId,
      creatorId: entity.creatorId,
    };
  }
}
