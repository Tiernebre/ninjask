import { Fragment } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { LiveDraftPool } from "../api/draft/LiveDraftPool";
import { SessionPayload } from "../api/session";
import { PokemonInformation } from "../components/pokemon/PokemonInformation";
import { PooledPokemon } from "../components/pokemon/PooledPokemon";
import "./LiveDraftPoolView.scss";

type LiveDraftPoolViewProps = {
  draftId: number;
  challengeOwnerId?: number;
  sessionPayload?: SessionPayload;
};

export const LiveDraftPoolView = ({ draftId, sessionPayload, challengeOwnerId }: LiveDraftPoolViewProps) => {
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

  console.log(sessionPayload)
  const userIsCreator = sessionPayload?.userId === challengeOwnerId

  return (
    <Fragment>
      {currentDraftStatus ? (
        <div className="LiveDraftPoolView columns is-marginless">
          <div className="LiveDraftPoolView__pooled-pokemon-column column is-2 is-12-mobile p-0">
            <PooledPokemon pokemon={pooledPokemon} />
          </div>
          <div className="LiveDraftPoolView__pokemon-information-column column is-10">
            <PokemonInformation
              pokemon={currentPokemon}
              emptyPlaceholder="The Pool is being loaded..."
            />
            {
              userIsCreator && <button className="button">Next</button>
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
