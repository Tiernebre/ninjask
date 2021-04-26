import { Pokemon } from "../pokemon/pokemon";

export interface LiveDraftPool {
  readonly draftId: number;
  readonly currentPokemon: Pokemon;
  readonly currentIndex: number;
  readonly pooledPokemon: Pokemon[];
}