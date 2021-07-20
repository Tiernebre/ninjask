import { HttpClient } from "../http";
import { ChallengeParticipantService } from "./ChallengeParticipantService";
import { ChallengeParticipantUpdateRequest } from "./ChallengeParticipantUpdateRequest";
import { ChallengeResult } from "./ChallengeResult";

export class HttpChallengeParticipantService
  implements ChallengeParticipantService
{
  constructor(private readonly httpClient: HttpClient) {}

  public updateOne(
    id: number,
    request: ChallengeParticipantUpdateRequest
  ): Promise<ChallengeResult> {
    return this.httpClient.patch(`challenge-participants/${id}`, request);
  }

  getAllForChallenge(challengeId: number): Promise<ChallengeResult[]> {
    return this.httpClient.get(`challenges/${challengeId}/results`);
  }

  async removeMeFromChallenge(challengeId: number): Promise<void> {
    await this.httpClient.delete(`challenges/${challengeId}/participants/me`);
  }

  async addMeToChallenge(challengeId: number): Promise<void> {
    await this.httpClient.post(`challenges/${challengeId}/participants`);
  }
}
