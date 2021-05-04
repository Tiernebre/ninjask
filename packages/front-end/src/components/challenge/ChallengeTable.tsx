import { Challenge } from "../../api/challenge";

const ChallengeRow = (challenge: Challenge) => (
  <tr key={challenge.id}>
    <td>{challenge.id}</td>
    <td>{challenge.name}</td>
    <td>{challenge.description}</td>
  </tr>
);

type ChallengeTableProps = {
  challenges: Challenge[];
};

export const ChallengeTable = ({ challenges }: ChallengeTableProps) => (
  <table className="table table-is-striped table-is-fullwidth">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>{challenges.map(ChallengeRow)}</tbody>
  </table>
);
