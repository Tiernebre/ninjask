import { Repository } from "typeorm";
import { ChallengeResult } from "./challenge-result";
import { ChallengeResultEntity } from "./challenge-result.entity";

export class ChallengeResultService {
  constructor(
    private readonly challengeResultRepository: Repository<ChallengeResultEntity>
  ) {}

  public async createOne(userId: number, challengeId: number): Promise<ChallengeResult> {
    let challengeResult = this.challengeResultRepository.create({
      userId,
      challengeId
    })
    challengeResult = await this.challengeResultRepository.save(challengeResult)
    return this.mapFromEntity(challengeResult)
  }

  private mapFromEntity(entity: ChallengeResultEntity): ChallengeResult {
    return {
      id: entity.id,
      userId: entity.userId,
      challengeId: entity.challengeId
    }
  }
}