import { Container, PageSpinner, useDidMount } from "@tiernebre/kecleon";
import { useParams } from "react-router-dom";
import { useGetChallengeApi } from "../../hooks";
import "./LiveDraftPoolView.scss";

type LiveDraftPoolViewParams = {
  challengeId: string;
};

export const LiveDraftPoolView = (): JSX.Element => {
  const { challengeId } = useParams<LiveDraftPoolViewParams>();
  const { challenge, draft, fetchChallenge } = useGetChallengeApi({
    challengeId: Number(challengeId),
  });

  useDidMount(() => {
    void fetchChallenge();
  });

  const content =
    challenge && draft ? <div>Challenge yo</div> : <PageSpinner />;

  return <Container>{content}</Container>;
};
