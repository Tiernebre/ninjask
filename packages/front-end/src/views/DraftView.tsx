import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useDidMount } from "rooks";
import { Draft } from "../api/draft/Draft";
import { HttpDraftService } from "../api/draft/HttpDraftService";
import { HttpClient } from "../api/http";
import { DraftPoolView } from "./DraftPoolView";
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
  const draftService = useMemo(() => new HttpDraftService(httpClient), [httpClient])

  const fetchDraft = useCallback(async () => {
    const draftService = new HttpDraftService(httpClient);
    setDraft(await draftService.getOneForChallengeId(Number(challengeId)));
  }, [challengeId, httpClient]);

  useDidMount(() => {
    fetchDraft();
  });

  let draftView

  if (draft) {
    draftView = draft.livePoolingHasFinished ? <DraftPoolView draftId={draft.id} draftService={draftService} /> : <LiveDraftPoolView draftId={draft.id} />
  } else {
    draftView = <p>Loading Draft...</p>
  }
  
  return draftView;
};
