import { Repository } from "typeorm";
import { Logger } from "../logger";
import { Draft } from "./draft";
import { DraftEntity } from "./draft.entity";

export class DraftService {
  constructor(
    private readonly draftRepository: Repository<DraftEntity>,
    private readonly logger: Logger
  ) {}

  public async getOneForChallengeId(id: number): Promise<Draft> {
    this.logger.info(`Fetching draft for challenge with id = ${id}`);
    const draft = await this.draftRepository
      .createQueryBuilder("draft")
      .innerJoin("draft.challenge", "challenge")
      .where("challenge.id = :id", { id })
      .getOne();
    if (!draft) {
      throw new Error(`Draft was not found for challenge with id = ${id}`);
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
    const { length: poolSize } = await entity.pokemon
    return {
      id: entity.id,
      poolSize,
      extraPoolSize: entity.extraPoolSize,
      livePoolingHasFinished:
        entity.livePoolPokemonIndex + 1 === poolSize,
    };
  }
}
