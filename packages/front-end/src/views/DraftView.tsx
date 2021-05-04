import "./DraftView.scss";
import { Fragment, useCallback, useState } from "react";
import { Link, useParams } from "react-router-dom";
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

  return (
    <div className="DraftView">
      {draft ? (
        <Fragment>
          <h1 className="title">Draft</h1>
          <Link className="button is-link" to={`/drafts/${draft.id}/live-pool`}>Live Pool</Link>
        </Fragment>
      ) : (
        <p>Loading Draft...</p>
      )}
    </div>
  );
};
