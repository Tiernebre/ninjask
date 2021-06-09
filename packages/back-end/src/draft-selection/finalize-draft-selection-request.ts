import { z } from "zod";

export const finalizeDraftSelectionRequestSchema = z.object({
  draftPokemonId: z.number().positive(),
});

export type FinalizeDraftSelectionRequest = z.infer<
  typeof finalizeDraftSelectionRequestSchema
>;
