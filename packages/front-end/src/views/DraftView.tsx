import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { useDidMount } from "rooks";
import { Draft } from "../api/draft/Draft";
import { HttpDraftService } from "../api/draft/HttpDraftService";
import { HttpClient } from "../api/http";

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

  return draft ? (
    <div>
      <h1>Draft</h1>
      <p>{draft.id}</p>
      <p>{draft.poolSize}</p>
    </div>
  ) : (
    <p>Loading Draft...</p>
  );
};
