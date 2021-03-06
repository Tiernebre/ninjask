import { generateMockChallenge } from "../challenge/challenge.mock";
import { generateRandomNumber, getRandomInt } from "../random";
import { Draft } from "./draft";
import { DraftPokemonEntity } from "./draft-pokemon.entity";
import { DraftEntity } from "./draft.entity";
import { LiveDraftPool } from "./live-draft-pool";
import { generateMockPokemon } from "../pokemon/pokemon.mock";
import { DraftPoolPokemon } from "./draft-pool-pokemon";

export const generateMockDraftPokemonEntity = (): DraftPokemonEntity => {
  const pokemonDraftEntity = new DraftPokemonEntity();
  pokemonDraftEntity.id = generateRandomNumber();
  pokemonDraftEntity.pokemonId = generateRandomNumber();
  return pokemonDraftEntity;
};

export const generateMockDraftEntity = (): DraftEntity => {
  const draftEntity = new DraftEntity();
  draftEntity.id = generateRandomNumber();
  draftEntity.extraPoolSize = 0;
  draftEntity.pokemon = Promise.resolve([
    generateMockDraftPokemonEntity(),
    generateMockDraftPokemonEntity(),
  ]);
  draftEntity.challenge = Promise.resolve(generateMockChallenge());
  draftEntity.challengeId = generateRandomNumber();
  draftEntity.livePoolPokemonIndex = -1;
  draftEntity.numberOfRounds = getRandomInt(1, 7);
  return draftEntity;
};

export const generateMockDraft = (): Draft => ({
  id: generateRandomNumber(),
  poolSize: generateRandomNumber(),
  extraPoolSize: generateRandomNumber(),
  livePoolingHasFinished: false,
  challengeId: generateRandomNumber(),
  numberOfRounds: getRandomInt(1, 7),
});

export const generateMockLiveDraftStatus = (): LiveDraftPool => ({
  draftId: generateRandomNumber(),
  currentPokemon: generateMockPokemon(),
  currentIndex: generateRandomNumber(),
  pooledPokemon: [generateMockPokemon()],
  isPoolOver: false,
});

export const generateMockDraftPokemon = (): DraftPoolPokemon => {
  return {
    ...generateMockPokemon(),
    draftPoolId: generateRandomNumber(),
  };
};
