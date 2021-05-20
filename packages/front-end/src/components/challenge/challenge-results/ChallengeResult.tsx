import "./ChallengeResult.scss";
import { ChallengeResult as ChallengeResultTyping } from "../../../api/challenge/ChallengeResult";

type ChallengeResultProps = {
  result: ChallengeResultTyping
  rank: number
}

const formatResultCompletionTime = (result: ChallengeResultTyping) => {
  const hour = `${result.completionTimeHour?.toString().padStart(2, '0')}`
  const minutes = `${result.completionTimeMinutes?.toString().padStart(2, '0')}`
  return  `${hour}:${minutes}`
}

export const ChallengeResult = ({ result, rank }: ChallengeResultProps) => (
  <div className="ChallengeResult">
    <span>{rank}. {result.nickname}</span>
    <span className="ChallengeResult__time">{formatResultCompletionTime(result)}</span>
  </div>
);
