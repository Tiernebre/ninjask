import { Fragment, useCallback } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Draft } from "../api/draft/Draft";
import { LiveDraftPool } from "../api/draft/LiveDraftPool";
import { SessionPayload } from "../api/session";
import { PokemonInformation } from "../components/pokemon/PokemonInformation";
import { PooledPokemon } from "../components/pokemon/PooledPokemon";
import "./LiveDraftPoolView.scss";

type LiveDraftPoolViewProps = {
  draft: Draft;
  challengeOwnerId?: number;
  sessionPayload?: SessionPayload;
  onFinished: () => void;
};

export const LiveDraftPoolView = ({
  draft,
  sessionPayload,
  challengeOwnerId,
  onFinished,
}: LiveDraftPoolViewProps) => {
  const { lastMessage, readyState, sendMessage } = useWebSocket(
    `${process.env.REACT_APP_BACK_END_API_WS_URL}/drafts/${Number(
      draft.id
    )}/live-pool`
  );

  const getNextPokemon = useCallback(() => {
    sendMessage("NEXT");
  }, [sendMessage]);

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

  const userIsCreator = sessionPayload?.userId === challengeOwnerId;

  return (
    <Fragment>
      {currentDraftStatus ? (
        <div className="LiveDraftPoolView columns is-marginless">
          <div className="LiveDraftPoolView__pooled-pokemon-column column is-2 is-12-mobile p-0">
            <PooledPokemon pokemon={pooledPokemon} poolSize={draft.poolSize} />
          </div>
          <div className="LiveDraftPoolView__pokemon-information-column column is-10">
            <PokemonInformation
              pokemon={currentPokemon}
              emptyPlaceholder="The Pool is being loaded..."
            />
            {userIsCreator && (
              <button className="button" onClick={getNextPokemon}>
                Next
              </button>
            )}
            {currentDraftStatus.isPoolOver &&
              <button className="button is-primary" onClick={onFinished}>
                Finish
              </button>
            }
          </div>
        </div>
      ) : (
        <div className="LiveDraftPoolView__loading">
          <p>Loading Live Draft...</p>
        </div>
      )}
    </Fragment>
  );
};
