import { Pokemon } from "../api/pokemon/Pokemon"
import "./PooledPokemon.css"

type PooledPokemonProps = {
  pokemon: Pokemon[]
}

export const PooledPokemon = ({ pokemon }: PooledPokemonProps) => {
  return (
    <div className="pooled-pokemon">
      <ol>
        {pokemon.map(individualPokemon => <li>{individualPokemon.name}</li>)}
      </ol>
    </div>
  )
}