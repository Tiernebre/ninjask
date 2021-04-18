import { generateRandomNumber, generateRandomString } from "../random";
import { Pokedex } from "./pokedex";
import { VersionDeniedPokemonEntity } from "./version-denied-pokemon.entity";

export const generateMockPokedex = (): Pokedex => {
  return new Pokedex(
    generateRandomNumber(),
    [generateRandomString(), generateRandomString()]
  )
}

export const generateMockVersionDeniedPokemon = (): VersionDeniedPokemonEntity => {
  const versionDeniedPokemon = new VersionDeniedPokemonEntity()
  versionDeniedPokemon.id = generateRandomNumber()
  versionDeniedPokemon.pokemonId = generateRandomNumber()
  versionDeniedPokemon.versionId = generateRandomNumber()
  return versionDeniedPokemon
}