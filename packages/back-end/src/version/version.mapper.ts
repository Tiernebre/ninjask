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
  return {
    id: pokeApiPokedex.id,
    pokemonUrls: pokeApiPokedex.pokemon_entries.map(
      ({ pokemon_species }) => pokemon_species.url
    ),
  };
};

export const mapVersionGroupFromPokeApi = (
  pokeApiVersionGroup: PokeApiVersionGroup
): VersionGroup => {
  return {
    id: pokeApiVersionGroup.id,
    pokedexUrl: pokeApiVersionGroup.pokedexes[0].url,
  };
};

export const mapVersionFromPokeApi = (
  pokeApiVersion: PokeApiVersion,
  deniedPokemonIds: number[] = []
): Version => {
  return {
    id: pokeApiVersion.id,
    name: pokeApiVersion.name,
    versionGroupUrl: pokeApiVersion.version_group.url,
    deniedPokemonIds: new Set(deniedPokemonIds),
  };
};
