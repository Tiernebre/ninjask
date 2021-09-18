import { Container, PageSpinner, useDidMount } from "@tiernebre/kecleon";
import { useParams } from "react-router-dom";
import { useGetChallenge, useLiveSession } from "../../hooks";
import { LiveDraft } from "./components/LiveDraft";

type LiveDraftViewParams = {
  challengeId: string;
};

export const LiveDraftView = (): JSX.Element => {
  const { challengeId } = useParams<LiveDraftViewParams>();
  const { challenge, draft, fetchChallenge } = useGetChallenge({
    challengeId: Number(challengeId),
  });
  const { liveSessionToken } = useLiveSession();

  useDidMount(() => {
    void fetchChallenge();
  });

  return challenge && draft && liveSessionToken ? (
    <LiveDraft
      challenge={challenge}
      draft={draft}
      liveSessionToken={liveSessionToken}
    />
  ) : (
    <Container>
      <PageSpinner />
    </Container>
  );
};
