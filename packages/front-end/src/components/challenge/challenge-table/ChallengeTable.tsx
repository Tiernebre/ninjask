import { Challenge } from "../../../api/challenge";
import { VersionTag } from "../../version/VersionTag";
import { Link } from "react-router-dom";
import { Table } from "@tiernebre/kecleon";

const ChallengeRow = (challenge: Challenge): JSX.Element => (
  <tr key={challenge.id}>
    <td>
      <Link className="is-link" to={`/challenges/${challenge.id}`}>
        {challenge.name}
      </Link>
    </td>
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

export const ChallengeTable = ({
  challenges,
}: ChallengeTableProps): JSX.Element => (
  <Table striped fullwidth>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Version</th>
        <th>Draft</th>
      </tr>
    </thead>
    <tbody>{challenges.map(ChallengeRow)}</tbody>
  </Table>
);
