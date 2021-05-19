import { Repository } from "typeorm";
import { ChallengeParticipant } from "./challenge-participant";
import { ChallengeParticipantUpdateRequest } from "./challenge-participant-update-request";
import { ChallengeParticipantEntity } from "./challenge-participant.entity";
import { ChallengeResult } from "./challenge-result";

export class ChallengeParticipantService {
  constructor(
    private readonly challengeParticipantRepository: Repository<ChallengeParticipantEntity>
  ) {}

  public async createOne(
    userId: number,
    challengeId: number
  ): Promise<ChallengeParticipant> {
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
  ): Promise<ChallengeParticipant> {
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

  public async getResultsInOrderForChallenge(challengeId: number): Promise<ChallengeResult[]> {
    return this.challengeParticipantRepository
      .createQueryBuilder("challengeResult")
      .innerJoin("challengeResult.user", "user")
      .select("challengeResult.id", "participantId")
      .addSelect("challengeResult.completionTimeHour", "completionTimeHour")
      .addSelect("challengeResult.completionTimeMinutes", "completionTimeMinutes")
      .addSelect("user.nickname", "nickname")
      .where("challengeResult.challengeId = :challengeId", { challengeId })
      .andWhere("challengeResult.completionTimeHour is not null")
      .andWhere("challengeResult.completionTimeMinutes is not null")
      .orderBy({
        "challengeResult.completionTimeHour": "ASC",
        "challengeResult.completionTimeMinutes": "ASC"
      })
      .getRawMany<ChallengeResult>();
  }

  private mapFromEntity(
    entity: ChallengeParticipantEntity
  ): ChallengeParticipant {
    return {
      id: entity.id,
      userId: entity.userId,
      challengeId: entity.challengeId,
      completionTimeHour: entity.completionTimeHour,
      completionTimeMinutes: entity.completionTimeMinutes,
    };
  }
}
