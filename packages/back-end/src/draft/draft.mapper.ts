import { Draft } from "./draft";
import { DraftEntity } from "./draft.entity";

export const mapDraftFromEntity = (entity: DraftEntity): Draft => {
  return {
    id: entity.id,
    extraPoolSize: entity.extraPoolSize,
    livePoolingHasFinished:
      entity.livePoolPokemonIndex + 1 === entity.poolSize,
  };
}