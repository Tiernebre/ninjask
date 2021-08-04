import { z } from "zod";

export const createLeagueRequestSchema = z.object({
  name: z.string().min(1).max(32),
  description: z.string().max(32).optional(),
});

export type CreateLeagueRequest = z.infer<typeof createLeagueRequestSchema>;
