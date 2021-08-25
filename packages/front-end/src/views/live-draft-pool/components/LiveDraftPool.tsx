import { useCallback, Fragment } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { LiveDraftPool as LiveDraftPoolApi, Draft, SessionPayload } from "../../../api";
import { PooledPokemon, PokemonInformation } from "../../../components";

type LiveDraftPoolProps = {
  draft: Draft;
  challengeOwnerId: number;
  sessionPayload?: SessionPayload;
  onFinished: () => void;
};

export const LiveDraftPool = ({
  draft,
  challengeOwnerId,
  sessionPayload,
  onFinished
}: LiveDraftPoolProps): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { lastJsonMessage, readyState, sendMessage } = useWebSocket(
    `${process.env.REACT_APP_BACK_END_API_WS_URL as string}/drafts/${Number(
      draft.id
    )}/live-pool`
  );

  const getNextPokemon = useCallback(() => {
    sendMessage("NEXT");
  }, [sendMessage]);

  const isReady = readyState === ReadyState.OPEN;
  const currentDraftStatus = lastJsonMessage as LiveDraftPoolApi;
  const userIsCreator = sessionPayload?.userId === challengeOwnerId;

  return (
    <Fragment>
      {isReady && currentDraftStatus ? (
        <div className="LiveDraftPoolView columns is-marginless">
          <div className="LiveDraftPoolView__pooled-pokemon-column column is-2 is-12-mobile p-0">
            <PooledPokemon
              pokemon={currentDraftStatus.pooledPokemon}
              poolSize={draft.poolSize}
            />
          </div>
          <div className="LiveDraftPoolView__pokemon-information-column column is-10">
            <PokemonInformation
              pokemon={currentDraftStatus.currentPokemon}
              emptyPlaceholder="The Pool is being loaded..."
            />
            <div className="LiveDraftPoolView__button-container mt-5">
              {userIsCreator && !currentDraftStatus.isPoolOver && (
                <button className="button" onClick={getNextPokemon}>
                  Next
                </button>
              )}
              {currentDraftStatus.isPoolOver && (
                <button className="button is-primary" onClick={onFinished}>
                  Finish
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="LiveDraftPoolView__loading">
          <p>Loading Live Draft...</p>
        </div>
      )}
    </Fragment>
  );
}