import "./ChallengeResults.scss";
import { ChallengeResult as ChallengeResultTyping } from "../../../api/challenge/ChallengeResult";
import { ChallengeResult } from "./ChallengeResult";
import { EmptyChallengeResults } from "./EmptyChallengeResults";

type ChallengeResultsProps = {
  results: ChallengeResultTyping[];
};

export const ChallengeResults = ({ results }: ChallengeResultsProps) => {
  const completedResults = results.filter(result => result.completionTimeHour && result.completionTimeMinutes)

  const content = completedResults.length ? (
    <ol>
      {completedResults.map((result, index) => (
        <li key={result.resultId}>
          <ChallengeResult result={result} rank={index + 1} />
        </li>
      ))}
    </ol>
  ) : (
    <EmptyChallengeResults />
  );

  return (
    <div className="ChallengeResults">
      <h3 className="ChallengeResults__heading">Challenge Results</h3>
      {content}
    </div>
  );
};
