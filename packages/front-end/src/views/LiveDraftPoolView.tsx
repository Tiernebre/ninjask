import { Fragment } from "react";
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
    <Fragment>
      <h1 className="title">Live Draft Pool</h1>
      <div className="LiveDraftPoolView columns is-mobile">
        <div className="column is-12-mobile">
          <PooledPokemon pokemon={pooledPokemon} />
        </div>
        <div className="column">
          <PokemonInformation
            pokemon={currentPokemon}
            emptyPlaceholder="The Pool is being loaded..."
          />
        </div>
      </div>
    </Fragment>
  );
};
