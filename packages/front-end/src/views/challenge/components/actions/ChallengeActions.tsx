import { ChallengeParticipantActions } from "./ChallengeParticipantActions";
import { ChallengeOwnerActions } from "./ChallengeOwnerActions";
import { Challenge } from "../../../../api";

export type ChallengeActionsProps = {
  challenge: Challenge;
  inChallenge: boolean;
  ownsChallenge: boolean;
  onLeaveChallenge: () => void;
  onJoinChallenge: () => void;
  onDeleteChallenge: () => void;
};

export const ChallengeActions = (props: ChallengeActionsProps): JSX.Element => {
  return props.ownsChallenge ? (
    <ChallengeOwnerActions
      onDeleteChallenge={props.onDeleteChallenge}
      challengeStatus={props.challenge.status}
    />
  ) : (
    <ChallengeParticipantActions {...props} />
  );
};
