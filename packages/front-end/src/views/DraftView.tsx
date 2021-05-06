import { Fragment, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { useDidMount } from "rooks";
import { Draft } from "../api/draft/Draft";
import { HttpDraftService } from "../api/draft/HttpDraftService";
import { HttpClient } from "../api/http";
import { LiveDraftPoolView } from "./LiveDraftPoolView";

type DraftViewParams = {
  challengeId?: string;
};

type DraftViewProps = {
  httpClient: HttpClient;
};

export const DraftView = ({ httpClient }: DraftViewProps) => {
  const [draft, setDraft] = useState<Draft>();
  const { challengeId } = useParams<DraftViewParams>();

  const fetchDraft = useCallback(async () => {
    const draftService = new HttpDraftService(httpClient);
    setDraft(await draftService.getOneForChallengeId(Number(challengeId)));
  }, [challengeId, httpClient]);

  useDidMount(() => {
    fetchDraft();
  });

  return (
    <Fragment>
      {draft ? (
        <Fragment>
          <LiveDraftPoolView draftId={draft.id} />
        </Fragment>
      ) : (
        <p>Loading Draft...</p>
      )}
    </Fragment>
  );
};
