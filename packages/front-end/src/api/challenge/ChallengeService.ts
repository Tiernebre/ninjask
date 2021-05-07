import { Challenge } from "./Challenge";

export interface ChallengeService {
  getAllForCurrentUser(): Promise<Challenge[]>;

  getOneById(id: number): Promise<Challenge>;
}
