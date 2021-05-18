export interface ChallengeParticipant {
  readonly id: number;
  readonly challengeId: number;
  readonly userId: number;
  readonly completionTimeHour: number | null;
  readonly completionTimeMinutes: number | null;
}
