import { HeadingGroup } from "@tiernebre/kecleon";
import { Challenge, Draft } from "../../../api";
import { useLiveDraft } from "../hooks/use-live-draft";

type LiveDraftProps = {
  challenge: Challenge;
  draft: Draft;
  liveSessionToken: string;
};

export const LiveDraft = ({
  challenge,
  draft,
  liveSessionToken,
}: LiveDraftProps): JSX.Element => {
  const { currentDraftSelections } = useLiveDraft({
    draftId: draft.id,
    liveSessionToken,
  });

  return (
    <div>
      <HeadingGroup title={`${challenge.name} Live Draft`} />
      {JSON.stringify(currentDraftSelections)}
    </div>
  );
};
