import { ChallengeStatus } from "./challenge-status";

export interface Challenge {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly versionId: number;
  readonly creatorId: number;
  readonly status: ChallengeStatus;
}
