import { number, string, z } from "zod";

export const createChallengeRequestSchema = z.object({
  name: string().min(1).max(32),
  description: string().max(128),
  versionId: number(),
  seasonId: number(),
});

export type CreateChallengeRequest = Readonly<
  z.infer<typeof createChallengeRequestSchema>
>;
