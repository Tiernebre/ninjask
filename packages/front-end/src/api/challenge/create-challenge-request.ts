import { number, string, z } from "zod";

// This is a hard-coded manual value that maps to the number of versions
// in PokeAPI. Too lazy to dynamically fetch this value for now, and since the games
// release every few years and the PokeAPI takes time to migrate to the new version
// this is a value that really does not change that often and can just be incremented
// manually.
const NUMBER_OF_POKEMON_VERSIONS = 34;

export const createChallengeRequestSchema = z
  .object({
    name: string().nonempty({ message: "This field is required" }).max(32),
    description: string().max(128),
    versionId: number().max(34),
    seasonId: number().max(NUMBER_OF_POKEMON_VERSIONS),
  })
  .strict();

export type CreateChallengeRequest = Readonly<
  z.infer<typeof createChallengeRequestSchema>
>;
