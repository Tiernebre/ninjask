import { ChallengeResult as ChallengeResultTyping } from "../../../api/challenge/ChallengeResult";
import { SessionPayload } from "../../../api/session";
import { ChallengeResultForm } from "./ChallengeResultForm";

type ChallengeResultActionProps = {
  results: ChallengeResultTyping[],
  sessionPayload: SessionPayload
}

export const ChallengeResultAction = ({ results, sessionPayload }: ChallengeResultActionProps) => {
  return (
    <div className="ChallengeResultAction">
      <ChallengeResultForm />
    </div>
  )
}
