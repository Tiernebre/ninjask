import { generateRandomNumber, generateRandomString } from "../random";
import { DraftSelectionRow } from "./draft-selection";

export const generateMockDraftSelectionRow = (pokemonId?: number | null): DraftSelectionRow => ({
  id: generateRandomNumber(),
  round: generateRandomNumber(),
  pick: generateRandomNumber(),
  userNickname: generateRandomString(),
  pokemonId: pokemonId === undefined ? generateRandomNumber() : pokemonId
})