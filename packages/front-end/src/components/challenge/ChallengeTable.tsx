import "./ChallengeTable.scss";
import { Challenge } from "../../api/challenge";
import { VersionTag } from "../version/VersionTag";
import { Link } from "react-router-dom";

const ChallengeRow = (challenge: Challenge) => (
  <tr key={challenge.id}>
    <td>{challenge.name}</td>
    <td>{challenge.description}</td>
    <td>
      <VersionTag id={challenge.versionId} />
    </td>
    <td>
      <Link
        className="button is-link is-light is-fullwidth"
        to={`/challenges/${challenge.id}/draft`}
      >
        Draft
      </Link>
    </td>
  </tr>
);

type ChallengeTableProps = {
  challenges: Challenge[];
};

export const ChallengeTable = ({ challenges }: ChallengeTableProps) => (
  <table className="ChallengeTable table is-striped is-fullwidth">
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Version</th>
        <th>Draft</th>
      </tr>
    </thead>
    <tbody>{challenges.map(ChallengeRow)}</tbody>
  </table>
);
