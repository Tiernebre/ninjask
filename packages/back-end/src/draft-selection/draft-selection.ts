import { Pokemon } from "../pokemon";

export interface DraftSelectionRow {
  readonly id: number;
  readonly round: number;
  readonly pick: number;
  readonly userNickname: string;
  readonly pokemonId: number | null;
}

export interface DraftSelection {
  readonly id: number;
  readonly round: number;
  readonly pick: number;
  readonly userNickname: string;
  readonly selection: Pokemon | null;
}
