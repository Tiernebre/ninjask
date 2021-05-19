import { ChallengeResult as ChallengeResultTyping } from "../../../api/challenge/ChallengeResult";

export const ChallengeResult = (result: ChallengeResultTyping) => (
  <div className="ChallengeResult">
    <p>{result.nickname}</p>
  </div>
);
