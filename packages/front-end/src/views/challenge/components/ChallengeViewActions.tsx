import { Fragment } from "react"

type ChallengeViewActionsProps = {
  isOwner: boolean;
}

export const ChallengeViewActions = ({ isOwner }: ChallengeViewActionsProps) => {
  const advanceButton = isOwner ? <button className="button is-success">Advance</button> : null

  return (
    <Fragment>
      {advanceButton}
    </Fragment>
  )
}