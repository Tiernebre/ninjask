import { z } from 'zod'

export const challengeParticipantRequestSchema = z.object({
  id: z.number(),
  userId: z.number(),
  completionTimeHour: z.number().min(0).max(99),
  completionTimeMinutes: z.number().min(0).max(59)
})

export type ChallengeParticipantUpdateRequest = z.infer<typeof challengeParticipantRequestSchema>
