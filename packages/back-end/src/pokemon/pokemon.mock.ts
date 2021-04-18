import { generateMockPokeApiPokemonSpecies } from "../poke-api";
import { Pokemon } from "./pokemon";
import { mapFromPokeApi } from "./pokemon.mapper";

export const generateMockPokemon = (): Pokemon =>
  mapFromPokeApi(generateMockPokeApiPokemonSpecies());
