import "./ChallengeViewActions.scss";

type ChallengeViewActionsProps = {
  isOwner: boolean;
};

export const ChallengeViewActions = ({
  isOwner,
}: ChallengeViewActionsProps) => {
  const advanceButton = isOwner ? (
    <button className="button is-success">Advance</button>
  ) : null;

  const deleteButton = isOwner ? (
    <button className="button is-danger">Delete</button>
  ) : null;

  return (
    <div className="ChallengeViewActions">
      {deleteButton}
      {advanceButton}
    </div>
  );
};
