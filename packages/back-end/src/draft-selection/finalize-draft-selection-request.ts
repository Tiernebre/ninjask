import { z } from "zod";

export const finalizeDraftSelectionRequestSchema = z.object({
  draftPokemonId: z.number().positive(),
});

export type FinalizeDraftSelectionRequest = Readonly<
  z.infer<typeof finalizeDraftSelectionRequestSchema>
>;
