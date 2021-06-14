import { generateRandomNumber, generateRandomString } from "../random";
import { Pokedex } from "./pokedex";
import { Version } from "./version";
import { VersionDeniedPokemonEntity } from "./version-denied-pokemon.entity";

export const generateMockPokedex = (): Pokedex => {
  const pokemonUrls: string[] = [];
  for (let i = 0; i < 150; i++) {
    pokemonUrls.push(generateRandomString());
  }
  return new Pokedex(generateRandomNumber(), pokemonUrls);
};

export const generateMockVersion = (): Version => {
  return new Version(
    generateRandomNumber(),
    generateRandomString(),
    generateRandomString(),
    new Set()
  );
};

export const generateMockVersionDeniedPokemon =
  (): VersionDeniedPokemonEntity => {
    const versionDeniedPokemon = new VersionDeniedPokemonEntity();
    versionDeniedPokemon.id = generateRandomNumber();
    versionDeniedPokemon.pokemonId = generateRandomNumber();
    versionDeniedPokemon.versionId = generateRandomNumber();
    return versionDeniedPokemon;
  };
