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
