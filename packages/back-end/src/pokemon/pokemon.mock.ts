import { generateRandomNumber, generateRandomString } from "../random";
import { Pokemon } from "./pokemon";

export const generateMockPokemon = (): Pokemon => {
  const pokemon = new Pokemon(
    generateRandomNumber(),
    generateRandomString(),
    generateRandomString(),
    generateRandomString()
  );
  return pokemon;
};
