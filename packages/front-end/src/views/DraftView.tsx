import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useDidMount } from "rooks";
import { Challenge, HttpChallengeService } from "../api/challenge";
import { Draft } from "../api/draft/Draft";
import { HttpDraftService } from "../api/draft/HttpDraftService";
import { HttpClient } from "../api/http";
import { SessionPayload } from "../api/session";
import { DraftPoolView } from "./DraftPoolView";
import { LiveDraftPoolView } from "./LiveDraftPoolView";

type DraftViewParams = {
  challengeId?: string;
};

type DraftViewProps = {
  httpClient: HttpClient;
  sessionPayload?: SessionPayload
};

export const DraftView = ({ httpClient, sessionPayload }: DraftViewProps) => {
  const [draft, setDraft] = useState<Draft>();
  const [challenge, setChallenge] = useState<Challenge>();
  const { challengeId } = useParams<DraftViewParams>();
  const draftService = useMemo(() => new HttpDraftService(httpClient), [
    httpClient,
  ]);

  const fetchDraft = useCallback(async () => {
    const draftService = new HttpDraftService(httpClient);
    setDraft(await draftService.getOneForChallengeId(Number(challengeId)));
  }, [challengeId, httpClient]);

  const fetchChallenge = useCallback(async () => {
    const challengeService = new HttpChallengeService(httpClient)
    setChallenge(await challengeService.getOneById(Number(challengeId)))
  }, [challengeId, httpClient])

  useDidMount(() => {
    fetchDraft();
    fetchChallenge();
  });

  let draftView;

  if (draft && challenge) {
    draftView = draft.livePoolingHasFinished ? (
      <DraftPoolView draftId={draft.id} draftService={draftService} />
    ) : (
      <LiveDraftPoolView draftId={draft.id} challengeOwnerId={challenge.creatorId} sessionPayload={sessionPayload} />
    );
  } else {
    draftView = <p>Loading Draft...</p>;
  }

  return draftView;
};
