import { Fragment } from "react"
import { VersionTag } from "../../../../components/version/VersionTag"

type ChallengeVersionProps = {
  versionId: number
}

export const ChallengeVersion = ({ versionId }: ChallengeVersionProps) => {
  return (
    <Fragment>
      <h3 className="subtitle">
        Version
      </h3>
      <VersionTag id={versionId }/>
    </Fragment>
  )
}