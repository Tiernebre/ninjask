export interface ChallengeResult {
  readonly resultId: number;
  readonly nickname: string;
  readonly completionTimeHour: number | null;
  readonly completionTimeMinutes: number | null;
  readonly participantId: number;
}
