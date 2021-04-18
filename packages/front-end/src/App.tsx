import "./App.css";
import { useCallback } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

function App() {
  const { sendMessage, lastMessage, readyState } = useWebSocket('ws://localhost:3000/live-draft')
  const restartDraft = useCallback(() => sendMessage('RESTART'), [])
  const fetchRequest = useCallback(() => sendMessage('NEXT'), [])

  const isReady = () => readyState === ReadyState.OPEN

  console.log(lastMessage)
  const pokemon = () => {
    try {
      return isReady() && lastMessage ? JSON.parse(lastMessage.data) : null
    } catch (error) {
      return null
    }
  }

  const pokemonInformation = pokemon() ? <div className="pokemon-information">
    <img src={pokemon().imageUrl} alt={`${pokemon().name}`}></img>
    <p>{ pokemon().name }</p>
  </div> : <div></div>

  const buttons = isReady() ? 
      <div className="pokemon-draft-buttons">
        <button onClick={restartDraft}>Restart the Draft!</button>
        <button onClick={fetchRequest}>See the next available Pokemon!</button>
      </div> : <div></div>

  return (
    <div className="app">
      {pokemonInformation}
      {buttons}
    </div>
  )
}

export default App;
