import { Pokemon } from "../../../src/api";
import { generateRandomNumber, generateRandomString } from "../../random";

export const generatePokemon = (): Pokemon => {
  return {
    id: generateRandomNumber(),
    name: generateRandomString(),
    imageUrls: {
      icon: generateRandomString(),
      image: generateRandomString(),
      thumbnail: generateRandomString(),
    },
  };
};

export const generateManyPokemon = (): Pokemon[] => {
  const pokemon = [];
  for (let i = 0; i < 20; i++) {
    pokemon.push(generatePokemon());
  }
  return pokemon;
};
