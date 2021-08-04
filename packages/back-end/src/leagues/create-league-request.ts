import { z } from "zod";

export const createLeagueRequestSchema = z
  .object({
    name: z.string().min(1).max(32),
    description: z.string().max(128).optional(),
  })
  .strict();

export type CreateLeagueRequest = Readonly<
  z.infer<typeof createLeagueRequestSchema>
>;
