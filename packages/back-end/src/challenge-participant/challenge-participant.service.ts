import { Repository } from "typeorm";
import { ChallengeParticipant } from "./challenge-participant";
import {
  challengeParticipantRequestSchema,
  ChallengeParticipantUpdateRequest,
} from "./challenge-participant-update-request";
import { ChallengeParticipantEntity } from "./challenge-participant.entity";
import { ChallengeResult } from "../challenge/challenge-result";
import { z } from "zod";
import { NotFoundError } from "../error/not-found-error";

export class ChallengeParticipantService {
  constructor(
    private readonly challengeParticipantRepository: Repository<ChallengeParticipantEntity>
  ) {}

  public async createOne(
    userId: number,
    challengeId: number
  ): Promise<ChallengeParticipant> {
    z.number().parse(userId);
    z.number().parse(challengeId);

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
    challengeParticipantRequestSchema.parse(request);

    let challengeResult = await this.challengeParticipantRepository.findOne({
      id: request.id,
      userId: request.userId,
    });
    if (!challengeResult) {
      throw new NotFoundError(
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

  public async getCompletedResultsForChallengeInOrder(
    challengeId: number
  ): Promise<ChallengeResult[]> {
    z.number().parse(challengeId);

    return this.challengeParticipantRepository
      .createQueryBuilder("challengeResult")
      .innerJoin("challengeResult.user", "user")
      .select("challengeResult.id", "resultId")
      .addSelect("challengeResult.completionTimeHour", "completionTimeHour")
      .addSelect(
        "challengeResult.completionTimeMinutes",
        "completionTimeMinutes"
      )
      .addSelect("user.nickname", "nickname")
      .addSelect("user.id", "participantId")
      .where("challengeResult.challengeId = :challengeId", { challengeId })
      .orderBy({
        "challengeResult.completionTimeHour": "ASC",
        "challengeResult.completionTimeMinutes": "ASC",
      })
      .getRawMany<ChallengeResult>();
  }

  public async getOneForUserOnChallenge(
    userId: number,
    challengeId: number
  ): Promise<ChallengeParticipant> {
    z.number().parse(userId);
    z.number().parse(challengeId);

    const challengeParticipant =
      await this.challengeParticipantRepository.findOne({
        userId,
        challengeId,
      });
    if (!challengeParticipant) {
      throw new NotFoundError(
        `Could not find participant for user ${userId} and challenge ${challengeId}`
      );
    }
    return this.mapFromEntity(challengeParticipant);
  }

  public async getAllForChallengeId(challengeId: number): Promise<ChallengeParticipant[]> {
    return (await this.challengeParticipantRepository.find({ challengeId })).map(participant => this.mapFromEntity(participant))
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
