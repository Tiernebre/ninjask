import { generateMockPokemon } from "../pokemon/pokemon.mock";
import { generateRandomNumber, generateRandomString } from "../random";
import { DraftSelection, DraftSelectionRow } from "./draft-selection";
import { FinalizeDraftSelectionRequest } from "./finalize-draft-selection-request";

export const generateMockDraftSelectionRow = (
  pokemonId?: number | null
): DraftSelectionRow => ({
  id: generateRandomNumber(),
  round: generateRandomNumber(),
  pick: generateRandomNumber(),
  userNickname: generateRandomString(),
  pokemonId: pokemonId === undefined ? generateRandomNumber() : pokemonId,
  userId: generateRandomNumber()
});

export const generateMockDraftSelection = (): DraftSelection => ({
  id: generateRandomNumber(),
  round: generateRandomNumber(),
  pick: generateRandomNumber(),
  userNickname: generateRandomString(),
  selection: generateMockPokemon(),
  userId: generateRandomNumber()
});

export const generateMockFinalizeDraftSelectionRequest = (): FinalizeDraftSelectionRequest => ({
  draftPokemonId: generateRandomNumber()
})
