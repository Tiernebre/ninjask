import { Pokemon } from "..";

export type DraftSelection = {
  readonly id: number;
  readonly round: number;
  readonly pick: number;
  readonly userNickname: string;
  readonly userId: number;
  readonly selection: Pokemon | null;
};
