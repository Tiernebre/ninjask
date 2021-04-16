import { PokeApiPokemon } from "../poke-api"
import { Pokemon } from "./pokemon"

const POKEMON_IMAGE_URL = 'https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images'

const getImageUrlForPokemon = (pokemon: PokeApiPokemon): string => {
  const id = pokemon.id.toString()
  const paddedId = id.padStart(3, '0')
  return `${POKEMON_IMAGE_URL}/${paddedId}.png`
}

export const mapFromPokeApi = (pokeApiPokemon: PokeApiPokemon): Pokemon => {
  return new Pokemon(
    pokeApiPokemon.id,
    pokeApiPokemon.name,
    getImageUrlForPokemon(pokeApiPokemon)
  )
}