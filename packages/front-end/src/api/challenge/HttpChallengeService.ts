import { HttpClient } from "../http";
import { Challenge } from "./Challenge";
import { ChallengeResult } from "./ChallengeResult";
import { ChallengeService } from "./ChallengeService";

export class HttpChallengeService implements ChallengeService {
  constructor(private readonly httpClient: HttpClient) {}

  getAllForCurrentUser(): Promise<Challenge[]> {
    return this.httpClient.get("challenges");
  }

  getOneById(id: number): Promise<Challenge> {
    return this.httpClient.get(`challenges/${id}`);
  }

  getResultsForChallenge(id: number): Promise<ChallengeResult[]> {
    return this.httpClient.get(`challenges/${id}/results`);
  }
}
