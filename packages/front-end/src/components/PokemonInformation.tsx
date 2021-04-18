import { Pokemon } from "../api/pokemon/Pokemon"
import './PokemonInformation.css'

type PokemonInformationProps = {
  pokemon?: Pokemon
}

export const PokemonInformation = ({ pokemon }: PokemonInformationProps) => {
  return pokemon ? <div className="pokemonInformation">
    <img className="pokemonInformation-image" src={pokemon.imageUrl} alt={`${pokemon.name}`}></img>
    <p className="pokemonInformation-name">{ pokemon.name }</p>
  </div> : <div></div>
}