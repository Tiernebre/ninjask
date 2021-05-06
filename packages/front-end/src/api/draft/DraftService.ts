import { Pokemon } from "../pokemon";
import { Draft } from "./Draft";

export interface DraftService {
  getOneForChallengeId(id: number): Promise<Draft>;

  getPoolForOneWithId(id: number): Promise<Pokemon[]>;
}
