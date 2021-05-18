import { Repository } from "typeorm";
import { ChallengeResult } from "./challenge-result";
import { ChallengeResultUpdateRequest } from "./challenge-result-update-request";
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

  public async updateOne(
    request: ChallengeResultUpdateRequest 
  ): Promise<ChallengeResult> {
    let challengeResult = await this.challengeResultRepository.findOne({
      id: request.id,
      userId: request.userId
    })
    if (!challengeResult) {
      throw new Error(`Could not find challenge with id = ${request.id} for user ${request.userId}`)
    }
    challengeResult.completionTimeHour = request.completionTimeHour
    challengeResult.completionTimeMinutes = request.completionTimeMinutes
    challengeResult = await this.challengeResultRepository.save(challengeResult)
    return this.mapFromEntity(challengeResult)
  }

  private mapFromEntity(entity: ChallengeResultEntity): ChallengeResult {
    return {
      id: entity.id,
      userId: entity.userId,
      challengeId: entity.challengeId,
      completionTimeHour: entity.completionTimeHour,
      completionTimeMinutes: entity.completionTimeMinutes
    }
  }
}