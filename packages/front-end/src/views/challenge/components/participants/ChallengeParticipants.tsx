import { ChallengeResult } from "../../../../api/challenge/ChallengeResult"

type ChallengeParticipantsProps = {
  participants: ChallengeResult[]
}

export const ChallengeParticipants = ({ participants }: ChallengeParticipantsProps) => {
  const rows =
    participants.map(participant => (
      <tr key={participant.participantId}>
        <td>{participant.nickname}</td>
      </tr>
    ))

  return (
    <div className="ChallengeParticipants is-fullwidth">
      <h3 className="subtitle">Registered Participants</h3>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  )
}