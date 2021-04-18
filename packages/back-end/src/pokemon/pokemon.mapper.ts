import { PokeApiPokemonSpecies } from "../poke-api";
import { Pokemon } from "./pokemon";

const POKEMON_IMAGE_URL =
  "https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images";
const POKEMON_ICON_IMAGE_URL =
  "https://raw.githubusercontent.com/msikma/pokesprite/master/icons/pokemon/regular";

const getImageUrlForPokemon = (pokemon: PokeApiPokemonSpecies): string => {
  const id = pokemon.id.toString();
  const paddedId = id.padStart(3, "0");
  return `${POKEMON_IMAGE_URL}/${paddedId}.png`;
};

const getIconImageUrlForPokemon = (pokemon: PokeApiPokemonSpecies): string => {
  return `${POKEMON_ICON_IMAGE_URL}/${pokemon.name.toLowerCase()}.png`;
};

export const mapFromPokeApi = (
  pokeApiPokemon: PokeApiPokemonSpecies
): Pokemon => {
  return new Pokemon(
    pokeApiPokemon.id,
    pokeApiPokemon.name,
    getImageUrlForPokemon(pokeApiPokemon),
    getIconImageUrlForPokemon(pokeApiPokemon)
  );
};
