import { Pokemon } from "../api/pokemon/Pokemon"
import './PokemonInformation.css'

type PokemonInformationProps = {
  pokemon?: Pokemon,
  emptyPlaceholder: string
}

export const PokemonInformation = ({ pokemon, emptyPlaceholder  }: PokemonInformationProps) => {
  return pokemon ? <div className="pokemonInformation">
    <img className="pokemonInformation-image" src={pokemon.imageUrl} alt={`${pokemon.name}`}></img>
    <p className="pokemonInformation-name">{ pokemon.name }</p>
  </div> : <p>{emptyPlaceholder}</p>
}