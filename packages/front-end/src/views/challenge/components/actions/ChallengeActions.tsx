import { ChallengeParticipantActions } from "./ChallengeParticipantActions";
import { ChallengeOwnerActions } from "./ChallengeOwnerActions";
import { Challenge, ChallengeStatus, Draft } from "../../../../api";
import { Button } from "@tiernebre/kecleon";
import styles from "./ChallengeActions.module.scss";

export type ChallengeActionsProps = {
  challenge: Challenge;
  draft: Draft;
  inChallenge: boolean;
  ownsChallenge: boolean;
  onLeaveChallenge: () => void;
  onJoinChallenge: () => void;
  onDeleteChallenge: () => void;
  onGenerateDraftPool: () => void;
  loading: boolean;
};

export const ChallengeActions = (props: ChallengeActionsProps): JSX.Element => {
  const challengeStatus = props.challenge.status;
  const content = props.ownsChallenge ? (
    <ChallengeOwnerActions
      onDeleteChallenge={props.onDeleteChallenge}
      challengeStatus={challengeStatus}
      onGenerateDraftPool={props.onGenerateDraftPool}
      loading={props.loading}
    />
  ) : (
    <ChallengeParticipantActions {...props} />
  );

  const viewLiveDraftPoolButton =
    challengeStatus === ChallengeStatus.POOLED &&
    !props.draft.livePoolingHasFinished ? (
      <Button
        color="link"
        link={{ to: `/challenges/${props.challenge.id}/live-draft-pool` }}
        loading={props.loading}
      >
        View Live Draft Pool
      </Button>
    ) : null;

  const viewDraftPoolButton = props.draft.livePoolingHasFinished ? (
    <Button
      color="link"
      link={{ to: `/drafts/${props.draft.id}/pool` }}
      loading={props.loading}
    >
      View Draft Pool
    </Button>
  ) : null;

  const viewLiveDraftButton =
    props.draft.livePoolingHasFinished &&
    props.challenge.status === ChallengeStatus.POOLED ? (
      <Button
        color="success"
        link={{ to: `/drafts/${props.draft.id}` }}
        loading={props.loading}
      >
        Participate in Live Draft
      </Button>
    ) : null;

  return (
    <div className={styles.container}>
      {content}
      {viewLiveDraftPoolButton}
      {viewDraftPoolButton}
      {viewLiveDraftButton}
    </div>
  );
};
