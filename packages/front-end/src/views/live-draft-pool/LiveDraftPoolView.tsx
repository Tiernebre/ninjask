import { Container, PageSpinner, useDidMount } from "@tiernebre/kecleon";
import { useParams } from "react-router-dom";
import { useGetChallengeApi, useSessionPayload } from "../../hooks";
import { LiveDraftPool } from "./components/LiveDraftPool";
import "./LiveDraftPoolView.scss";

type LiveDraftPoolViewParams = {
  challengeId: string;
};

export const LiveDraftPoolView = (): JSX.Element => {
  const sessionPayload = useSessionPayload();
  const { challengeId } = useParams<LiveDraftPoolViewParams>();
  const { challenge, draft, fetchChallenge } = useGetChallengeApi({
    challengeId: Number(challengeId),
  });

  useDidMount(() => {
    void fetchChallenge();
  });

  const content =
    challenge && draft ? (
      <LiveDraftPool
        draft={draft}
        challengeOwnerId={challenge.creatorId}
        sessionPayload={sessionPayload}
        onFinished={console.log}
      />
    ) : (
      <Container>
        <PageSpinner />
      </Container>
    );

  return content;
};
