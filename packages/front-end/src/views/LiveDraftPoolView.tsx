import useWebSocket, { ReadyState } from "react-use-websocket";
import { LiveDraftPool } from "../api/draft/LiveDraftPool";
import { PokemonInformation } from "../components/pokemon/PokemonInformation";
import { PooledPokemon } from "../components/pokemon/PooledPokemon";
import "./LiveDraftPoolView.scss";

export const LiveDraftPoolView = () => {
  const { lastMessage, readyState } = useWebSocket(
    `${process.env.REACT_APP_BACK_END_API_WS_URL}/drafts/1/live-pool`
  );

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

  return (
    <div className="LiveDraftPoolView columns">
      <div className="column is-2 LiveDraftPoolView__pooled-pokemon-container">
        <PooledPokemon pokemon={pooledPokemon} />
      </div>
      <div className="column is-10 LiveDraftPoolView__pokemon-information-container">
        <PokemonInformation
          pokemon={currentPokemon}
          emptyPlaceholder="The Pool is being loaded..."
        />
      </div>
    </div>
  );
};
