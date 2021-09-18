import { HeadingGroup } from "@tiernebre/kecleon";
import { Challenge, Draft } from "../../../api";

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
  return <HeadingGroup title={`${challenge.name} Live Draft`} />;
};
