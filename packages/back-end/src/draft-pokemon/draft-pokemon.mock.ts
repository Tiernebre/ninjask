import { DraftPokemon } from ".";
import { generateRandomNumber } from "../random";

export const generateMockDraftPokemon = (
  props: Partial<DraftPokemon> = {}
): DraftPokemon => ({
  id: generateRandomNumber(),
  pokemonId: generateRandomNumber(),
  draftId: props.draftId || generateRandomNumber(),
});
