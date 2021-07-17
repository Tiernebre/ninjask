import { Buttons, IconButton } from "@tiernebre/kecleon";

export type ChallengeActionsProps = {
  inChallenge: boolean;
  ownsChallenge: boolean;
  onLeaveChallenge: () => void;
  onJoinChallenge: () => void;
};

const ChallengeParticipantActions = ({
  inChallenge,
  onLeaveChallenge,
  onJoinChallenge,
}: ChallengeActionsProps): JSX.Element => {
  if (inChallenge) {
    return (
      <IconButton
        color="danger"
        icon={{
          name: "times",
          fontSize: "sm",
        }}
        onClick={onLeaveChallenge}
      >
        Leave Challenge
      </IconButton>
    );
  } else {
    return (
      <IconButton
        color="success"
        icon={{
          name: "plus",
          fontSize: "sm",
        }}
        onClick={onJoinChallenge}
      >
        Join Challenge
      </IconButton>
    );
  }
};

export const ChallengeActions = (props: ChallengeActionsProps): JSX.Element => {
  return (
    <Buttons>
      <ChallengeParticipantActions {...props} />
    </Buttons>
  );
};
