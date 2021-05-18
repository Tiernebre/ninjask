export interface ChallengeResult {
  readonly id: number;
  readonly challengeId: number;
  readonly userId: number;
  readonly completionTimeHour: number | null;
  readonly completionTimeMinutes: number | null;
}