import { IconButton } from "@tiernebre/kecleon";
import { ChallengeActionsProps } from ".";

export const ChallengeParticipantActions = ({
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
