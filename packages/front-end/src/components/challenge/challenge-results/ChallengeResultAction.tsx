import { ChallengeResult as ChallengeResultTyping } from "../../../api/challenge/ChallengeResult";
import { SessionPayload } from "../../../api/session";

type ChallengeResultActionProps = {
  results: ChallengeResultTyping[],
  sessionPayload: SessionPayload
}

export const ChallengeResultAction = ({ results, sessionPayload }: ChallengeResultActionProps) => {
  return (
    <div className="ChallengeResultAction">
      <p>Some Action for a Challenge Result.</p>
    </div>
  )
}
