import "./ChallengeTable.scss";
import { Challenge } from "../../api/challenge";
import { VersionTag } from "../version/VersionTag";

const ChallengeRow = (challenge: Challenge) => (
  <tr key={challenge.id}>
    <td>{challenge.id}</td>
    <td>{challenge.name}</td>
    <td>{challenge.description}</td>
    <td><VersionTag /></td>
  </tr>
);

type ChallengeTableProps = {
  challenges: Challenge[];
};

export const ChallengeTable = ({ challenges }: ChallengeTableProps) => (
  <table className="ChallengeTable table is-striped is-fullwidth">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Description</th>
        <th>Version</th>
      </tr>
    </thead>
    <tbody>{challenges.map(ChallengeRow)}</tbody>
  </table>
);
