import {
  PokeApiPokedex,
  PokeApiVersion,
  PokeApiVersionGroup,
} from "../poke-api";
import { Pokedex } from "./pokedex";
import { VersionEntity } from "./version.entity";
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

export const mapVersionFromEntity = (entity: VersionEntity): Version => {
  return {
    id: entity.id,
    name: entity.name,
    versionGroupUrl: entity.versionGroupUrl,
    deniedPokemonIds: new Set(
      entity.deniedPokemon.map(({ pokemonId }) => pokemonId)
    ),
  };
};
