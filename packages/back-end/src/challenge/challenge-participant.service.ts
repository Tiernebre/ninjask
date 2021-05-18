import { Repository } from "typeorm";
import { ChallengeResult } from "./challenge-result";
import { ChallengeParticipantUpdateRequest } from "./challenge-participant-update-request";
import { ChallengeParticipantEntity } from "./challenge-participant.entity";

export class ChallengeParticipantService {
  constructor(
    private readonly challengeParticipantRepository: Repository<ChallengeParticipantEntity>
  ) {}

  public async createOne(
    userId: number,
    challengeId: number
  ): Promise<ChallengeResult> {
    let challengeResult = this.challengeParticipantRepository.create({
      userId,
      challengeId,
    });
    challengeResult = await this.challengeParticipantRepository.save(
      challengeResult
    );
    return this.mapFromEntity(challengeResult);
  }

  public async updateOne(
    request: ChallengeParticipantUpdateRequest
  ): Promise<ChallengeResult> {
    let challengeResult = await this.challengeParticipantRepository.findOne({
      id: request.id,
      userId: request.userId,
    });
    if (!challengeResult) {
      throw new Error(
        `Could not find challenge with id = ${request.id} for user ${request.userId}`
      );
    }
    challengeResult.completionTimeHour = request.completionTimeHour;
    challengeResult.completionTimeMinutes = request.completionTimeMinutes;
    challengeResult = await this.challengeParticipantRepository.save(
      challengeResult
    );
    return this.mapFromEntity(challengeResult);
  }

  private mapFromEntity(entity: ChallengeParticipantEntity): ChallengeResult {
    return {
      id: entity.id,
      userId: entity.userId,
      challengeId: entity.challengeId,
      completionTimeHour: entity.completionTimeHour,
      completionTimeMinutes: entity.completionTimeMinutes,
    };
  }
}
