import { PokeApiPokemonSpecies } from "../poke-api";
import { Pokemon } from "./pokemon";
import { PokemonImageUrls } from "./pokemon-image-urls";

const POKEMON_IMAGE_URL =
  "https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images";
const POKEMON_ICON_IMAGE_URL =
  "https://raw.githubusercontent.com/msikma/pokesprite/master/icons/pokemon/regular";
const POKEMON_THUMBNAIL_IMAGE_URL =
  "https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/thumbnails-compressed";

const getPaddedPokemonId = (pokemon: PokeApiPokemonSpecies): string => {
  const id = pokemon.id.toString();
  return id.padStart(3, "0");
}

const getImageUrlForPokemon = (pokemon: PokeApiPokemonSpecies): string => {
  return `${POKEMON_IMAGE_URL}/${getPaddedPokemonId(pokemon)}.png`;
};

const getIconImageUrlForPokemon = (pokemon: PokeApiPokemonSpecies): string => {
  return `${POKEMON_ICON_IMAGE_URL}/${pokemon.name.toLowerCase()}.png`;
};

const getThumbnailImageUrlForPokemon = (pokemon: PokeApiPokemonSpecies): string => {
  return `${POKEMON_THUMBNAIL_IMAGE_URL}/${getPaddedPokemonId(pokemon)}.png`;
};

const getImageUrlsForPokeApiPokemon = (pokeApiPokemon: PokeApiPokemonSpecies): PokemonImageUrls => {
  return {
    icon: getIconImageUrlForPokemon(pokeApiPokemon),
    image: getImageUrlForPokemon(pokeApiPokemon),
    thumbnail: getThumbnailImageUrlForPokemon(pokeApiPokemon)
  }
}

export const mapFromPokeApi = (
  pokeApiPokemon: PokeApiPokemonSpecies
): Pokemon => ({
  id: pokeApiPokemon.id,
  name: pokeApiPokemon.name,
  imageUrls: getImageUrlsForPokeApiPokemon(pokeApiPokemon)
});
