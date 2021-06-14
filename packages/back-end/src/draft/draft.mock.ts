import { generateMockChallenge } from "../challenge/challenge.mock";
import { generateRandomNumber } from "../random";
import { Draft } from "./draft";
import { DraftPokemonEntity } from "./draft-pokemon.entity";
import { DraftEntity } from "./draft.entity";
import { LiveDraftPool } from "./live-draft-pool";
import { generateMockPokemon } from "../pokemon/pokemon.mock";

export const generateMockDraftPokemonEntity = (): DraftPokemonEntity => {
  const pokemonDraftEntity = new DraftPokemonEntity();
  pokemonDraftEntity.id = generateRandomNumber();
  pokemonDraftEntity.pokemonId = generateRandomNumber();
  return pokemonDraftEntity;
};

export const generateMockDraftEntity = (): DraftEntity => {
  const draftEntity = new DraftEntity();
  draftEntity.id = generateRandomNumber();
  draftEntity.extraPoolSize = generateRandomNumber();
  draftEntity.pokemon = Promise.resolve([generateMockDraftPokemonEntity()]);
  draftEntity.challenge = Promise.resolve(generateMockChallenge());
  draftEntity.livePoolPokemonIndex = -1;
  return draftEntity;
};

export const generateMockDraft = (): Draft => ({
  id: generateRandomNumber(),
  poolSize: generateRandomNumber(),
  livePoolingHasFinished: false,
});

export const generateMockLiveDraftStatus = (): LiveDraftPool => ({
  draftId: generateRandomNumber(),
  currentPokemon: generateMockPokemon(),
  currentIndex: generateRandomNumber(),
  pooledPokemon: [generateMockPokemon()],
  isPoolOver: false,
});
