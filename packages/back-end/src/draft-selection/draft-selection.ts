import { Pokemon } from "../pokemon";

interface SharedDraftSelectionCriteria {
  readonly id: number;
  readonly round: number;
  readonly pick: number;
  readonly userNickname: string;
  readonly userId: number;
}

export interface DraftSelectionRow extends SharedDraftSelectionCriteria {
  readonly pokemonId: number | null;
}

export interface DraftSelection extends SharedDraftSelectionCriteria {
  readonly selection: Pokemon | null;
}
