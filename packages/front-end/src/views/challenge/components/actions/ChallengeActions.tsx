import { ChallengeParticipantActions } from "./ChallengeParticipantActions";
import { ChallengeOwnerActions } from "./ChallengeOwnerActions";
import { Challenge, ChallengeStatus } from "../../../../api";
import { Fragment } from "react";
import { Button } from "@tiernebre/kecleon";

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
  const challengeStatus = props.challenge.status;
  const content = props.ownsChallenge ? (
    <ChallengeOwnerActions
      onDeleteChallenge={props.onDeleteChallenge}
      challengeStatus={challengeStatus}
      onGenerateDraftPool={props.onGenerateDraftPool}
    />
  ) : (
    <ChallengeParticipantActions {...props} />
  );

  const additionalButtons =
    challengeStatus === ChallengeStatus.POOLED ? (
      <Button color="link" link={{ to: `drafts/${props.challenge.id}/live` }}>
        View Live Draft Pool
      </Button>
    ) : null;

  return (
    <Fragment>
      {content}
      {additionalButtons}
    </Fragment>
  );
};
