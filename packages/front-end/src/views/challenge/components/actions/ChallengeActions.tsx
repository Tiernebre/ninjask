import { ChallengeParticipantActions } from "./ChallengeParticipantActions";
import { ChallengeOwnerActions } from "./ChallengeOwnerActions";
import { Challenge } from "../../../../api";
import { Fragment } from "react";

export type ChallengeActionsProps = {
  challenge: Challenge;
  inChallenge: boolean;
  ownsChallenge: boolean;
  onLeaveChallenge: () => void;
  onJoinChallenge: () => void;
  onDeleteChallenge: () => void;
  onGenerateDraftPool: () => void;
};

export const ChallengeActions = (props: ChallengeActionsProps): JSX.Element => {
  const content = props.ownsChallenge ? (
    <ChallengeOwnerActions
      onDeleteChallenge={props.onDeleteChallenge}
      challengeStatus={props.challenge.status}
      onGenerateDraftPool={props.onGenerateDraftPool}
    />
  ) : (
    <ChallengeParticipantActions {...props} />
  );

  return <Fragment>{content}</Fragment>;
};
