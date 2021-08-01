import { generateRandomNumber, generateRandomString } from "../random";
import { Pokedex } from "./pokedex";
import { VersionEntity } from "./pokemon-version.entity";
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

export const generateMockVersionDeniedPokemon =
  (): VersionDeniedPokemonEntity => {
    const versionDeniedPokemon = new VersionDeniedPokemonEntity();
    versionDeniedPokemon.id = generateRandomNumber();
    versionDeniedPokemon.pokemonId = generateRandomNumber();
    versionDeniedPokemon.versionId = generateRandomNumber();
    return versionDeniedPokemon;
  };

export const generateMockVersionEntity = (): VersionEntity => {
  const versionEntity = new VersionEntity();
  versionEntity.id = generateRandomNumber();
  versionEntity.name = generateRandomString();
  versionEntity.versionGroupUrl = generateRandomString();
  return versionEntity;
};
