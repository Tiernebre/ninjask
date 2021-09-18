import { Container, PageSpinner, useDidMount } from "@tiernebre/kecleon";
import { useParams } from "react-router-dom";
import { useGetChallenge } from "../../hooks";
import { LiveDraft } from "./components/LiveDraft";

type LiveDraftViewParams = {
  challengeId: string;
};

export const LiveDraftView = (): JSX.Element => {
  const { challengeId } = useParams<LiveDraftViewParams>();
  const { challenge, draft, fetchChallenge } = useGetChallenge({
    challengeId: Number(challengeId),
  });

  useDidMount(() => {
    void fetchChallenge();
  });

  return challenge && draft ? (
    <LiveDraft challenge={challenge} draft={draft} />
  ) : (
    <Container>
      <PageSpinner />
    </Container>
  );
};
