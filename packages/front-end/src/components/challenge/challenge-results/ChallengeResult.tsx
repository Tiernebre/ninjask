import { ChallengeResult as ChallengeResultTyping } from "../../../api/challenge/ChallengeResult";

type ChallengeResultProps = {
  result: ChallengeResultTyping
}

export const ChallengeResult = ({ result }: ChallengeResultProps) => (
  <div className="ChallengeResult">
    <p>{result.nickname}</p>
  </div>
);
