import "./App.css";
import { FetchHttpClient } from './api/http';
import { HttpPokemonService } from './api/pokemon';
import { useCallback, useState } from 'react';
import { Pokemon } from './api/pokemon/Pokemon';

const backEndHttpClient = new FetchHttpClient('http://ec2-35-163-100-24.us-west-2.compute.amazonaws.com:3000/')
const pokemonService = new HttpPokemonService(backEndHttpClient)

function App() {
  const [pokemon, setPokemon] = useState<Pokemon>()

  const fetchRequest = useCallback(() => {
    async function fetchPokemon() {
      const randomPokemon = await pokemonService.getARandomOne()
      setPokemon(randomPokemon)
    }
    fetchPokemon()
  }, [])

  const pokemonInformation = pokemon ? <div className="pokemon-information">
    <img src={pokemon.imageUrl} alt={`${pokemon.name}`}></img>
    <p>{ pokemon.name }</p>
  </div> : <div></div>

  return (
    <div className="app">
      {pokemonInformation}
      <button onClick={fetchRequest}>Get a random Pokemon!</button>
    </div>
  )
}

export default App;
