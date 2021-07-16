import { ChallengeResult } from "../../../../api";

const formatCompletionTimeForResult = (result: ChallengeResult): string => {
  const { completionTimeHour: hour, completionTimeMinutes: minutes } = result;
  return hour && minutes ? `${hour}:${minutes}` : "Not Completed Yet";
};

type ChallengeResultsTableRowProps = {
  result: ChallengeResult;
  placement: number;
};

export const ChallengeResultsTableRow = ({
  result,
  placement,
}: ChallengeResultsTableRowProps): JSX.Element => {
  return (
    <tr>
      <td>{placement}</td>
      <td>{result.nickname}</td>
      <td>{formatCompletionTimeForResult(result)}</td>
    </tr>
  );
};
