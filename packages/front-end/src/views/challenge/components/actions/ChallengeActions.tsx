import { ChallengeParticipantActions } from "./ChallengeParticipantActions";
import { ChallengeOwnerActions } from "./ChallengeOwnerActions";

export type ChallengeActionsProps = {
  inChallenge: boolean;
  ownsChallenge: boolean;
  onLeaveChallenge: () => void;
  onJoinChallenge: () => void;
};

export const ChallengeActions = (props: ChallengeActionsProps): JSX.Element => {
  return props.ownsChallenge ? (
    <ChallengeOwnerActions />
  ) : (
    <ChallengeParticipantActions {...props} />
  );
};
