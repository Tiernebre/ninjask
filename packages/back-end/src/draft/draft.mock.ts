import { generateMockChallenge } from "../challenge/challenge.mock";
import { generateRandomNumber } from "../random";
import { DraftPokemonEntity } from "./draft-pokemon.entity";
import { DraftEntity } from "./draft.entity";

export const generateMockDraftPokemonEntity = (): DraftPokemonEntity => {
  const pokemonDraftEntity = new DraftPokemonEntity();
  pokemonDraftEntity.id = generateRandomNumber();
  pokemonDraftEntity.pokemonId = generateRandomNumber();
  return pokemonDraftEntity;
};

export const generateMockDraftEntity = (): DraftEntity => {
  const draftEntity = new DraftEntity();
  draftEntity.id = generateRandomNumber();
  draftEntity.poolSize = generateRandomNumber();
  draftEntity.pokemon = Promise.resolve([generateMockDraftPokemonEntity()]);
  draftEntity.challenge = Promise.resolve(generateMockChallenge());
  draftEntity.livePoolPokemonIndex = -1;
  return draftEntity;
};
