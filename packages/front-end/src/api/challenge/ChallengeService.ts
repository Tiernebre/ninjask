import { Challenge } from "./Challenge";
import { ChallengeResult } from "./ChallengeResult";

export interface ChallengeService {
  getAllForCurrentUser(): Promise<Challenge[]>;

  getOneById(id: number): Promise<Challenge>;

  getResultsForChallenge(id: number): Promise<ChallengeResult[]>;
}
