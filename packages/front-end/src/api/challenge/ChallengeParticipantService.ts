import { ChallengeParticipantUpdateRequest } from "./ChallengeParticipantUpdateRequest";
import { ChallengeResult } from "./ChallengeResult";

export interface ChallengeParticipantService {
  updateOne(
    id: number,
    request: ChallengeParticipantUpdateRequest
  ): Promise<ChallengeResult>;
}
