import { Pokemon } from "../pokemon/pokemon";

export interface LiveDraftPool {
  readonly draftId: number;
  readonly currentPokemon: Pokemon | null;
  readonly currentIndex: number;
  readonly pooledPokemon: Pokemon[];
  readonly isPoolOver: boolean;
}