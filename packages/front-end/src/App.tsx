import { FetchHttpClient } from './api/http';
import { HttpPokemonService } from './api/pokemon';
import { useEffect, useState } from 'react';
import { Pokemon } from './api/pokemon/Pokemon';

const backEndHttpClient = new FetchHttpClient('http://ec2-35-163-100-24.us-west-2.compute.amazonaws.com:3000/')
const pokemonService = new HttpPokemonService(backEndHttpClient)

function App() {
  const [pokemon, setPokemon] = useState<Pokemon>()

  useEffect(() => {
    async function fetchPokemon() {
      const randomPokemon = await pokemonService.getARandomOne()
      setPokemon(randomPokemon)
    }
    fetchPokemon()
  }, [])

  return pokemon ? <div>
    <img src={pokemon.imageUrl} alt={`${pokemon.name}`}></img>
    <p>{ pokemon.name }</p>
    <p>{ pokemon.id }</p>
  </div> : <div></div>
}

export default App;
