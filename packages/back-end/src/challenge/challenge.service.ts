import { z } from "zod";
import { Challenge, ChallengeEntity } from ".";
import { ForbiddenError } from "../error";
import { NotFoundError } from "../error/not-found-error";
import { ChallengeStatus } from "./challenge-status";
import { ChallengeRepository } from "./challenge.repository";
import {
  CreateChallengeRequest,
  createChallengeRequestSchema,
} from "./create-challenge-request";

const ALLOWED_STATUSES_FOR_POOL_GENERATION: Set<ChallengeStatus> = new Set([
  ChallengeStatus.CREATED,
  ChallengeStatus.POOLED,
]);

export class ChallengeService {
  constructor(private readonly challengeRepository: ChallengeRepository) {}

  async oneCanHavePoolGeneratedWithId(id: number): Promise<boolean> {
    const challenge = await this.getOneById(id);
    return ALLOWED_STATUSES_FOR_POOL_GENERATION.has(challenge.status);
  }

  async createOne(
    request: CreateChallengeRequest,
    creatorId: number
  ): Promise<Challenge> {
    createChallengeRequestSchema.parse(request);
    z.number().parse(creatorId);

    const challengeToCreate = this.challengeRepository.create({
      ...request,
      creatorId,
    });
    const createdChallenge = await this.challengeRepository.save(
      challengeToCreate
    );
    return this.mapFromEntity(createdChallenge);
  }

  async deleteOneById(id: number, userId: number): Promise<void> {
    const challenge = await this.getOneById(id);
    if (challenge.creatorId !== userId) {
      throw new ForbiddenError(
        "Could not delete challenge, requesting user does not own it."
      );
    }
    await this.challengeRepository.delete({ id: challenge.id });
  }

  async getOneById(id: number): Promise<Challenge> {
    z.number().parse(id);
    const challenge = await this.challengeRepository.findOne(id);
    if (!challenge) {
      throw new NotFoundError(`Challenge was not found for id = ${id}`);
    }
    return this.mapFromEntity(challenge);
  }

  async getAll(): Promise<Challenge[]> {
    return this.mapMany(await this.challengeRepository.find());
  }

  async getAllForUserWithId(id: number): Promise<Challenge[]> {
    z.number().parse(id);
    return this.mapMany(
      await this.challengeRepository.findAllForUserWithId(id)
    );
  }

  async getAllForSeason(seasonId: number): Promise<Challenge[]> {
    z.number().parse(seasonId);
    return this.mapMany(
      await this.challengeRepository.findAllWithSeasonId(seasonId)
    );
  }

  async getAllForLeague(leagueId: number): Promise<Challenge[]> {
    z.number().parse(leagueId);
    return this.mapMany(
      await this.challengeRepository.findAllForLeagueWithId(leagueId)
    );
  }

  async updateStatusForOneWithId(
    id: number,
    status: ChallengeStatus
  ): Promise<void> {
    await this.challengeRepository.update(id, { status });
  }

  private mapMany(entities: ChallengeEntity[]): Challenge[] {
    return entities.map((entity) => this.mapFromEntity(entity));
  }

  private mapFromEntity(entity: ChallengeEntity): Challenge {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      versionId: entity.versionId,
      creatorId: entity.creatorId,
      status: entity.status,
    };
  }
}
