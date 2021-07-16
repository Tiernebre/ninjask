import { Table } from "@tiernebre/kecleon";
import { ChallengeResult } from "../../../../api";

const formatCompletionTimeForResult = (result: ChallengeResult): string => {
  const { completionTimeHour: hour, completionTimeMinutes: minutes } = result;
  return hour && minutes ? `${hour}:${minutes}` : "Not Completed Yet";
};

export type ChallengeResultsTableRowProps = {
  result: ChallengeResult;
  placement: number;
};

const ChallengeResultsTableRow = ({
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

type ChallengeResultsTableProps = {
  results: ChallengeResult[];
};

export const ChallengeResultsTable = ({
  results,
}: ChallengeResultsTableProps): JSX.Element => {
  return (
    <Table fullwidth striped>
      <thead>
        <tr>
          <th>Ranking</th>
          <th>Name</th>
          <th>Completion Time</th>
        </tr>
      </thead>
      <tbody>
        {results.map((result, index) => (
          <ChallengeResultsTableRow
            key={result.resultId}
            result={result}
            placement={index + 1}
          />
        ))}
      </tbody>
    </Table>
  );
};
