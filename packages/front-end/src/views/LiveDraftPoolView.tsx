import { useCallback } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { LiveDraftPool } from "../api/draft/LiveDraftPool";
import { PokemonInformation } from "../components/pokemon/PokemonInformation";
import { PooledPokemon } from "../components/pokemon/PooledPokemon";
import './LiveDraftPoolView.css'

export const LiveDraftPoolView = () => {
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    `${process.env.REACT_APP_BACK_END_API_WS_URL}/drafts/1/live-pool`
  );
  const getNextPokemon = useCallback(() => sendMessage("NEXT"), [sendMessage]);

  const isReady = () => readyState === ReadyState.OPEN;

  let currentDraftStatus: LiveDraftPool | null = null;
  if (isReady() && lastMessage) {
    try {
      currentDraftStatus = JSON.parse(lastMessage.data);
    } catch {
      currentDraftStatus = null;
    }
  }

  const currentPokemon = currentDraftStatus?.currentPokemon || undefined;
  const pooledPokemon = currentDraftStatus?.pooledPokemon || [];

  const buttons = isReady() ? (
    <div className="PokemonLiveDraft__buttons">
      <button onClick={getNextPokemon}>See the next available Pokemon!</button>
    </div>
  ) : (
    <div></div>
  );

  return (
    <div className="PokemonLiveDraft">
      <div className="PokemonLiveDraft__pooled-pokemon-container">
        <PooledPokemon pokemon={pooledPokemon} />
      </div>
      <div className="PokemonLiveDraft__pokemon-information-container">
        <PokemonInformation
          pokemon={currentPokemon}
          emptyPlaceholder="The Pokemon is being loaded..."
        />
        {buttons}
      </div>
    </div>
  );
}