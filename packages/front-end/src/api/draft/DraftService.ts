import { Draft } from "./Draft";

export interface DraftService {
  getOneForChallengeId(id: number): Promise<Draft>
}