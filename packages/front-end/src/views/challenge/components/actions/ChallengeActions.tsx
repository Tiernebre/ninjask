import { ChallengeParticipantActions } from "./ChallengeParticipantActions";
import { ChallengeOwnerActions } from "./ChallengeOwnerActions";
import { ChallengeStatus } from "../../../../api/challenge/ChallengeStatus";

export type ChallengeActionsProps = {
  challengeStatus: ChallengeStatus;
  inChallenge: boolean;
  ownsChallenge: boolean;
  onLeaveChallenge: () => void;
  onJoinChallenge: () => void;
  onDeleteChallenge: () => void;
  onGenerateDraftPool: () => void;
};

export const ChallengeActions = (props: ChallengeActionsProps): JSX.Element => {
  return props.ownsChallenge ? (
    <ChallengeOwnerActions
      onDeleteChallenge={props.onDeleteChallenge}
      challengeStatus={props.challengeStatus}
      onGenerateDraftPool={props.onGenerateDraftPool}
    />
  ) : (
    <ChallengeParticipantActions {...props} />
  );
};
