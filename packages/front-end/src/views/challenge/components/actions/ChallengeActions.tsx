import { Buttons, IconButton } from "@tiernebre/kecleon";

export type ChallengeActionsProps = {
  inChallenge: boolean;
};

const ChallengeParticipantActions = ({
  inChallenge,
}: ChallengeActionsProps): JSX.Element => {
  if (inChallenge) {
    return (
      <IconButton
        color="danger"
        icon={{
          name: "times",
          fontSize: "sm",
        }}
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
      >
        Join Challenge
      </IconButton>
    );
  }
};

export const ChallengeActions = ({
  inChallenge,
}: ChallengeActionsProps): JSX.Element => {
  return (
    <Buttons>
      <ChallengeParticipantActions inChallenge={inChallenge} />
    </Buttons>
  );
};
