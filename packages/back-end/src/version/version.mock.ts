import { generateRandomNumber, generateRandomString } from "../random";
import { Pokedex } from "./pokedex";

export const generateMockPokedex = (): Pokedex => {
  return new Pokedex(
    generateRandomNumber(),
    [generateRandomString(), generateRandomString()]
  )
}