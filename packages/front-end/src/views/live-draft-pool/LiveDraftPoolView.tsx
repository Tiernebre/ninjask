import { Container, PageSpinner, useDidMount } from "@tiernebre/kecleon";
import { useHistory, useParams } from "react-router-dom";
import { useGetChallengeApi, useSessionPayload } from "../../hooks";
import { LiveDraftPool } from "./components/LiveDraftPool";
import "./LiveDraftPoolView.scss";

type LiveDraftPoolViewParams = {
  challengeId: string;
};

export const LiveDraftPoolView = (): JSX.Element => {
  const history = useHistory();
  const sessionPayload = useSessionPayload();
  const { challengeId } = useParams<LiveDraftPoolViewParams>();
  const { challenge, draft, fetchChallenge } = useGetChallengeApi({
    challengeId: Number(challengeId),
  });

  const viewFullPool = () => {
    if (draft) {
      history.push(`/drafts/${draft.id}/pool`);
    }
  };

  useDidMount(() => {
    void fetchChallenge();
  });

  return challenge && draft ? (
    <LiveDraftPool
      draft={draft}
      challengeOwnerId={challenge.creatorId}
      sessionPayload={sessionPayload}
      onFinished={viewFullPool}
    />
  ) : (
    <Container>
      <PageSpinner />
    </Container>
  );
};
