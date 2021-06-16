import { Repository } from "typeorm";
import { NotFoundError } from "../error";
import { Logger } from "../logger";
import { Draft } from "./draft";
import { DraftEntity } from "./draft.entity";

export class DraftService {
  constructor(
    private readonly draftRepository: Repository<DraftEntity>,
    private readonly logger: Logger
  ) {}

  public async getOne(id: number): Promise<Draft> {
    const draft = await this.draftRepository.findOne(id);
    if (!draft) {
      throw new NotFoundError(`Draft was not found for id = ${id}`);
    }
    return this.mapFromEntity(draft);
  }

  public async getOneForChallengeId(challengeId: number): Promise<Draft> {
    this.logger.info(`Fetching draft for challenge with id = ${challengeId}`);
    const draft = await this.draftRepository.findOne({ challengeId });
    if (!draft) {
      throw new Error(
        `Draft was not found for challenge with id = ${challengeId}`
      );
    }
    return this.mapFromEntity(draft);
  }

  public async getOneAsEntityWithPool(id: number): Promise<DraftEntity> {
    this.logger.info(`Fetching draft with id = ${id}`);
    const draft = await this.draftRepository.findOne(id, {
      relations: ["pokemon"],
    });
    if (!draft) {
      throw new Error(`Draft with id ${id} was not found.`);
    }
    this.logger.info(`Returning draft ${JSON.stringify(draft)}`);
    return draft;
  }

  public async incrementPoolIndexForOneWithId(id: number): Promise<void> {
    await this.draftRepository.increment({ id }, "livePoolPokemonIndex", 1);
  }

  private async mapFromEntity(entity: DraftEntity): Promise<Draft> {
    const { length: poolSize } = await entity.pokemon;
    return {
      id: entity.id,
      poolSize,
      extraPoolSize: entity.extraPoolSize,
      livePoolingHasFinished:
        !!poolSize && entity.livePoolPokemonIndex + 1 === poolSize,
      challengeId: entity.challengeId,
      numberOfRounds: entity.numberOfRounds,
    };
  }
}
