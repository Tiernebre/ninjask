import { z } from "zod";

export const createChallengeRequestSchema = z
  .object({
    challengeId: z.number(),
    extraPoolSize: z.number(),
  })
  .strict();

export type CreateChallengeRequest = z.infer<
  typeof createChallengeRequestSchema
>;
