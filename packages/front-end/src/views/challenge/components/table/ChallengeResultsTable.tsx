import { Table } from "@tiernebre/kecleon";
import { ChallengeResult } from "../../../../api";
import { ChallengeResultsTableRow } from "./ChallengeResultsRow";

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
