import { ChallengeParticipantUpdateRequest } from "./ChallengeParticipantUpdateRequest";
import { ChallengeResult } from "./ChallengeResult";

export interface ChallengeParticipantService {
  updateOne(
    id: number,
    request: ChallengeParticipantUpdateRequest
  ): Promise<ChallengeResult>;

  getAllForChallenge(challengeId: number): Promise<ChallengeResult[]>;

  removeMeFromChallenge(challengeId: number): Promise<void>;

  addMeToChallenge(challengeId: number): Promise<void>;
}
