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
    debugger;
    return this.httpClient.patch(`challenge-participants/${id}`, request);
  }
}
