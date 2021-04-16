import { PokeApiPokemon } from "../poke-api"
import { Pokemon } from "./pokemon"

export const mapFromPokeApi = (pokeApiPokemon: PokeApiPokemon): Pokemon => {
  return new Pokemon(
    pokeApiPokemon.id,
    pokeApiPokemon.name,
    'test'
  )
}