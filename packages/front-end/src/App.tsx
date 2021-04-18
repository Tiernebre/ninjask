import "./App.css";
import { useCallback } from 'react';
import useWebSocket from 'react-use-websocket';

function App() {
  const { sendMessage, lastMessage } = useWebSocket('ws://localhost:3000/live-draft')

  const restartDraft = useCallback(() => sendMessage('RESTART'), [])

  const fetchRequest = useCallback(() => {
    async function fetchPokemon() {
      sendMessage('NEXT')
    }
    fetchPokemon()
  }, [])

  const pokemon = lastMessage ? JSON.parse(lastMessage.data) : null

  const pokemonInformation = pokemon ? <div className="pokemon-information">
    <img src={pokemon.imageUrl} alt={`${pokemon.name}`}></img>
    <p>{ pokemon.name }</p>
  </div> : <div></div>

  return (
    <div className="app">
      {pokemonInformation}
      <div className="pokemon-draft-buttons">
        <button onClick={restartDraft}>Restart the Draft!</button>
        <button onClick={fetchRequest}>See the next available Pokemon!</button>
      </div>
    </div>
  )
}

export default App;
