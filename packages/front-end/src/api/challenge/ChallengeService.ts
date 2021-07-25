import { Challenge } from "./Challenge";
export interface ChallengeService {
  getAll(): Promise<Challenge[]>;

  getAllForCurrentUser(): Promise<Challenge[]>;

  getOneById(id: number): Promise<Challenge>;

  deleteOneById(id: number): Promise<void>;
}
