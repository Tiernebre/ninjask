import { Pokemon } from "../api/pokemon/Pokemon"

type PooledPokemonProps = {
  pokemon: Pokemon[]
}

export const PooledPokemon = ({ pokemon }: PooledPokemonProps) => {
  return (
    <div>
      <ol>
        {pokemon.map(individualPokemon => <li>{individualPokemon.name}</li>)}
      </ol>
    </div>
  )
}