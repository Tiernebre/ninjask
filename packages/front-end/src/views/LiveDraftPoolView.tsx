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
      {currentDraftStatus ? (
        <div className="LiveDraftPoolView columns">
          <div className="LiveDraftPoolView__pooled-pokemon-column column is-2 is-12-mobile">
            <PooledPokemon pokemon={pooledPokemon} />
          </div>
          <div className="LiveDraftPoolView__pokemon-information-column column is-10">
            <PokemonInformation
              pokemon={currentPokemon}
              emptyPlaceholder="The Pool is being loaded..."
            />
          </div>
        </div>
      ) : (
        <p>Loading Live Draft...</p>
      )}
    </Fragment>
  );
};
