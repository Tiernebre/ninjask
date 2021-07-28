import { HttpClient } from "../http";
import { Challenge } from "./Challenge";
import { ChallengeService } from "./ChallengeService";
import { CreateChallengeRequest } from "./create-challenge-request";

export class HttpChallengeService implements ChallengeService {
  constructor(private readonly httpClient: HttpClient) {}

  getAll(): Promise<Challenge[]> {
    return this.httpClient.get("challenges");
  }

  getAllForCurrentUser(): Promise<Challenge[]> {
    return this.httpClient.get("me/challenges");
  }

  getOneById(id: number): Promise<Challenge> {
    return this.httpClient.get(`challenges/${id}`);
  }

  deleteOneById(id: number): Promise<void> {
    return this.httpClient.delete(`challenges/${id}`);
  }

  createOne(request: CreateChallengeRequest): Promise<Challenge> {
    return this.httpClient.post("challenges", request);
  }
}
