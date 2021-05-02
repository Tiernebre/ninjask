import { generateRandomNumber, generateRandomString } from "../random";
import { Pokemon } from "./pokemon";
import { PokemonImageUrls } from "./pokemon-image-urls";

const generateMockPokemonImageUrls = (): PokemonImageUrls => ({
  icon: generateRandomString(),
  image: generateRandomString(),
  thumbnail: generateRandomString(),
});

export const generateMockPokemon = (): Pokemon => ({
  id: generateRandomNumber(),
  name: generateRandomString(),
  imageUrls: generateMockPokemonImageUrls(),
});
