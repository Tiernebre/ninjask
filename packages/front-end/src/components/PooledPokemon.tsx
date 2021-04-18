import { Pokemon } from "../api/pokemon/Pokemon"
import "./PooledPokemon.css"

type PooledPokemonProps = {
  pokemon: Pokemon[]
}

const PooledPokemonListing = (pokemon: Pokemon) => <li key={pokemon.id}>
  <div className="pooledPokemon-pokemon">
    <img src={pokemon.iconUrl} alt={pokemon.name}></img>
    <p>{pokemon.name}</p>
  </div>
</li>

export const PooledPokemon = ({ pokemon }: PooledPokemonProps) => {
  return (
    <div className="pooledPokemon">
      <h2 className="pooledPokemon-heading">
        Pooled Pokemon
      </h2>
      <ol>
        {pokemon.map(PooledPokemonListing)}
      </ol>
    </div>
  )
}