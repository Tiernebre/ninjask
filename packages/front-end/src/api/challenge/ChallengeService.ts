import { Challenge } from "./Challenge";
export interface ChallengeService {
  getAllForCurrentUser(): Promise<Challenge[]>;

  getOneById(id: number): Promise<Challenge>;

  deleteOneById(id: number): Promise<void>;
}
