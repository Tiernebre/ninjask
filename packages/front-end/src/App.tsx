/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import { useCallback } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { Pokemon } from "./api/pokemon/Pokemon";
import { PooledPokemon } from "./components/PooledPokemon";
import { PokemonInformation } from "./components/PokemonInformation";

interface DraftStatus {
  currentPokemon: Pokemon;
  pooledPokemon: Pokemon[];
}

function App() {
  const { sendMessage, lastMessage, readyState } = useWebSocket('ws://localhost:3000/live-draft')
  const restartDraft = useCallback(() => sendMessage('RESTART'), [])
  const fetchRequest = useCallback(() => sendMessage('NEXT'), [])

  const isReady = () => readyState === ReadyState.OPEN

  let currentDraftStatus: DraftStatus | null = null
  if (isReady() && lastMessage) {
    try {
      currentDraftStatus = JSON.parse(lastMessage.data)
    } catch {
      currentDraftStatus = null
    }
  }

  const currentPokemon = currentDraftStatus?.currentPokemon
  const pooledPokemon = currentDraftStatus?.pooledPokemon || []

  const buttons = isReady() ? 
      <div className="pokemon-draft-buttons">
        <button onClick={restartDraft}>Restart the Draft!</button>
        <button onClick={fetchRequest}>See the next available Pokemon!</button>
      </div> : <div></div>

  return (
    <div className="app">
      <div className="app-pooled-pokemon-container">
        <PooledPokemon pokemon={pooledPokemon} />
      </div>
      <div className="app-pokemon-information-container">
        <PokemonInformation pokemon={currentPokemon} emptyPlaceholder="The Pokemon is being loaded..." />
        {buttons}
      </div>
    </div>
  )
}

export default App;
