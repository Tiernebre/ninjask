import { Container, PageSpinner } from "@tiernebre/kecleon";
import { useParams } from "react-router-dom";
import { useSessionPayload } from "../../hooks";
import "./LiveDraftPoolView.scss";

type LiveDraftPoolViewParams = {
  challengeId: string;
};

export const LiveDraftPoolView = (): JSX.Element => {
  const { challengeId } = useParams<LiveDraftPoolViewParams>();

  return (
    <Container>
      <PageSpinner />
    </Container>
  );
};
