import { HeadingGroup } from "@tiernebre/kecleon";
import { Challenge, Draft } from "../../../api";

type LiveDraftProps = {
  challenge: Challenge;
  draft: Draft;
};

export const LiveDraft = ({
  challenge,
  draft,
}: LiveDraftProps): JSX.Element => {
  return (
    <div>
      <HeadingGroup title={`${challenge.name} Live Draft`} />
    </div>
  );
};
