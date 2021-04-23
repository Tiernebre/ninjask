/* eslint-disable react-hooks/exhaustive-deps */
import "./PokemonLiveDraft.css";
import { useCallback } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Pokemon } from "../api/pokemon/Pokemon";
import { PooledPokemon } from "./PooledPokemon";
import { PokemonInformation } from "./PokemonInformation";

interface DraftStatus {
  currentPokemon: Pokemon;
  pooledPokemon: Pokemon[];
}

export const PokemonLiveDraft = () => {
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    `${process.env.REACT_APP_BACK_END_API_WS_URL}/live-draft`
  );
  const restartDraft = useCallback(() => sendMessage("RESTART"), []);
  const fetchRequest = useCallback(() => sendMessage("NEXT"), []);

  const isReady = () => readyState === ReadyState.OPEN;

  let currentDraftStatus: DraftStatus | null = null;
  if (isReady() && lastMessage) {
    try {
      currentDraftStatus = JSON.parse(lastMessage.data);
    } catch {
      currentDraftStatus = null;
    }
  }

  const currentPokemon = currentDraftStatus?.currentPokemon;
  const pooledPokemon = currentDraftStatus?.pooledPokemon || [];

  const buttons = isReady() ? (
    <div className="pokemon-draft-buttons">
      <button onClick={restartDraft}>Restart the Draft!</button>
      <button onClick={fetchRequest}>See the next available Pokemon!</button>
    </div>
  ) : (
    <div></div>
  );

  return (
    <div className="PokemonLiveDraft">
      <div className="PokemonLiveDraft-pooled-pokemon-container">
        <PooledPokemon pokemon={pooledPokemon} />
      </div>
      <div className="PokemonLiveDraft-pokemon-information-container">
        <PokemonInformation
          pokemon={currentPokemon}
          emptyPlaceholder="The Pokemon is being loaded..."
        />
        {buttons}
      </div>
    </div>
  )
}