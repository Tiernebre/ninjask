import { Challenge } from "../../api/challenge"

const ChallengeRow = (challenge: Challenge) => (
  <tr key={challenge.id}>
    <td>
      {challenge.name}
    </td>
  </tr>
)

type ChallengeTableProps = {
  challenges: Challenge[]
}

export const ChallengeTable = ({ challenges }: ChallengeTableProps) => (
  <table className="table">
    <thead>
      <tr>
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
      {challenges.map(ChallengeRow)}
    </tbody>
  </table>
)