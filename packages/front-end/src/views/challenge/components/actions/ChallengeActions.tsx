import { ChallengeParticipantActions } from "./ChallengeParticipantActions";
import { ChallengeOwnerActions } from "./ChallengeOwnerActions";
import { Challenge, ChallengeStatus, Draft } from "../../../../api";
import { Fragment } from "react";
import { Button } from "@tiernebre/kecleon";

export type ChallengeActionsProps = {
  challenge: Challenge;
  draft: Draft;
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

  const viewLiveDraftPoolButton =
    challengeStatus === ChallengeStatus.POOLED &&
    !props.draft.livePoolingHasFinished ? (
      <Button
        color="link"
        link={{ to: `/challenges/${props.challenge.id}/draft/live` }}
      >
        View Live Draft Pool
      </Button>
    ) : null;

  const viewDraftPoolButton = props.draft.livePoolingHasFinished ? (
    <Button
      color="link"
      link={{ to: `/challenges/${props.challenge.id}/draft/pool` }}
    >
      View Draft Pool
    </Button>
  ) : null;

  return (
    <Fragment>
      {content}
      {viewLiveDraftPoolButton}
      {viewDraftPoolButton}
    </Fragment>
  );
};
