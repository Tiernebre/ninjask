import { z } from "zod";

export const createDraftRequestSchema = z
  .object({
    challengeId: z.number().min(1),
    extraPoolSize: z.number(),
  })
  .strict();

export type CreateDraftRequest = z.infer<typeof createDraftRequestSchema>;
