import "./ChallengeResults.scss";
import { ChallengeResult as ChallengeResultTyping } from "../../../api/challenge/ChallengeResult";
import { ChallengeResult } from "./ChallengeResult";
import { EmptyChallengeResults } from "./EmptyChallengeResults";
import { Fragment } from "react";

type ChallengeResultsProps = {
  results: ChallengeResultTyping[];
};

export const ChallengeResults = ({ results }: ChallengeResultsProps) => {
  const content = results.length ? (
    <Fragment>
      <h3 className="ChallengeResults__heading">Challenge Results</h3>
      <ol>
        {results.map((result, index) => (
          <li key={result.resultId}>
            <ChallengeResult result={result} rank={index + 1} />
          </li>
        ))}
      </ol>
    </Fragment>
  ) : (
    <EmptyChallengeResults />
  );

  return <div className="ChallengeResults">{content}</div>;
};
