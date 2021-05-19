export interface ChallengeResult {
  readonly participantId: number
  readonly nickname: string
  readonly completionTimeHour: number | null
  readonly completionTimeMinutes: number | null
}