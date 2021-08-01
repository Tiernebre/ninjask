import { generateRandomNumber, generateRandomString } from "../random";
import { Pokedex } from "./pokedex";
import { VersionEntity } from "./version.entity";
import { Version } from "./version";
import { VersionDeniedPokemonEntity } from "./version-denied-pokemon.entity";

export const generateMockPokedex = (): Pokedex => {
  const pokemonUrls: string[] = [];
  for (let i = 0; i < 150; i++) {
    pokemonUrls.push(generateRandomString());
  }
  return {
    id: generateRandomNumber(),
    pokemonUrls,
  };
};

export const generateMockVersion = (): Version => {
  return {
    id: generateRandomNumber(),
    name: generateRandomString(),
    versionGroupUrl: generateRandomString(),
    deniedPokemonIds: new Set(),
  };
};

export const generateMockVersionEntity = (): VersionEntity => {
  const versionEntity = new VersionEntity();
  versionEntity.id = generateRandomNumber();
  versionEntity.name = generateRandomString();
  versionEntity.versionGroupUrl = generateRandomString();
  versionEntity.deniedPokemon = [];
  return versionEntity;
};

export const generateMockVersionDeniedPokemon =
  (): VersionDeniedPokemonEntity => {
    const versionDeniedPokemon = new VersionDeniedPokemonEntity();
    versionDeniedPokemon.id = generateRandomNumber();
    versionDeniedPokemon.pokemonId = generateRandomNumber();
    versionDeniedPokemon.version = generateMockVersionEntity();
    return versionDeniedPokemon;
  };
