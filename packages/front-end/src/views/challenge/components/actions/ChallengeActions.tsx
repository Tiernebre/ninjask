import { ChallengeParticipantActions } from "./ChallengeParticipantActions";
import { ChallengeOwnerActions } from "./ChallengeOwnerActions";

export type ChallengeActionsProps = {
  inChallenge: boolean;
  ownsChallenge: boolean;
  onLeaveChallenge: () => void;
  onJoinChallenge: () => void;
  onDeleteChallenge: () => void;
};

export const ChallengeActions = (props: ChallengeActionsProps): JSX.Element => {
  return props.ownsChallenge ? (
    <ChallengeOwnerActions onDeleteChallenge={props.onDeleteChallenge} />
  ) : (
    <ChallengeParticipantActions {...props} />
  );
};
