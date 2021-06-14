import { Repository } from "typeorm";
import { z } from "zod";
import { Challenge, ChallengeEntity } from ".";
import { NotFoundError } from "../error/not-found-error";
import { ChallengeStatus } from "./challenge-status";

const ALLOWED_STATUSES_FOR_POOL_GENERATION: Set<ChallengeStatus> = new Set([ChallengeStatus.CREATED, ChallengeStatus.POOLED])

export class ChallengeService {
  constructor(
    private readonly challengeRepository: Repository<ChallengeEntity>
  ) {}

  async oneCanHavePoolGeneratedWithId(id: number): Promise<boolean> {
    const challenge = await this.getOneById(id)
    return ALLOWED_STATUSES_FOR_POOL_GENERATION.has(challenge.status)
  }

  async getOneById(id: number): Promise<Challenge> {
    z.number().parse(id);
    const challenge = await this.challengeRepository.findOne(id);
    if (!challenge) {
      throw new NotFoundError(`Challenge was not found for id = ${id}`);
    }
    return this.mapFromEntity(challenge);
  }

  async getAllForUserWithId(id: number): Promise<Challenge[]> {
    z.number().parse(id);
    const challenges = await this.challengeRepository
      .createQueryBuilder("challenge")
      .innerJoin("challenge.participants", "participant")
      .innerJoin("participant.user", "user")
      .where("user.id = :id", { id })
      .getMany();
    return challenges.map((entity) => this.mapFromEntity(entity));
  }

  async updateStatusForOneWithId(
    id: number,
    status: ChallengeStatus
  ): Promise<void> {
    await this.challengeRepository.update(id, { status });
  }


  private mapFromEntity(entity: ChallengeEntity): Challenge {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      versionId: entity.versionId,
      creatorId: entity.creatorId,
      status: entity.status
    };
  }
}
