import {
  PokeApiPokedex,
  PokeApiVersion,
  PokeApiVersionGroup,
} from "../poke-api";
import { Pokedex } from "./pokedex";
import { Version } from "./version";
import { VersionGroup } from "./version-group";

export const mapPokedexFromPokeApi = (
  pokeApiPokedex: PokeApiPokedex
): Pokedex => {
  return new Pokedex(
    pokeApiPokedex.id,
    pokeApiPokedex.pokemon_entries.map(
      ({ pokemon_species }) => pokemon_species.url
    )
  );
};

export const mapVersionGroupFromPokeApi = (
  pokeApiVersionGroup: PokeApiVersionGroup
): VersionGroup => {
  return new VersionGroup(
    pokeApiVersionGroup.id,
    pokeApiVersionGroup.pokedexes[0].url
  );
};

export const mapVersionFromPokeApi = (
  pokeApiVersion: PokeApiVersion,
  deniedPokemonIds: number[] = []
): Version => {
  return new Version(
    pokeApiVersion.id,
    pokeApiVersion.name,
    pokeApiVersion.version_group.url,
    new Set(deniedPokemonIds)
  );
};
