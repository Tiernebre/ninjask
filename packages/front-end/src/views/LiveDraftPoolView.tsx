import { Fragment } from "react";
import { useParams } from "react-router";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { LiveDraftPool } from "../api/draft/LiveDraftPool";
import { PokemonInformation } from "../components/pokemon/PokemonInformation";
import { PooledPokemon } from "../components/pokemon/PooledPokemon";
import "./LiveDraftPoolView.scss";

type DraftParams = {
  draftId?: string;
};

export const LiveDraftPoolView = () => {
  const { draftId } = useParams<DraftParams>();
  const { lastMessage, readyState } = useWebSocket(
    `${process.env.REACT_APP_BACK_END_API_WS_URL}/drafts/${Number(
      draftId
    )}/live-pool`
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
      {currentDraftStatus ? (
        <div className="LiveDraftPoolView">
          <PooledPokemon pokemon={pooledPokemon} />
          <PokemonInformation
            pokemon={currentPokemon}
            emptyPlaceholder="The Pool is being loaded..."
          />
        </div>
      ) : (
        <p>Loading Live Draft...</p>
      )}
    </Fragment>
  );
};
