import { Table } from "@tiernebre/kecleon";
import { League } from "../../../api";
import { LeagueRow } from "./LeagueRow";

type LeagueTableProps = {
  leagues: League[];
};

export const LeagueTable = ({ leagues }: LeagueTableProps): JSX.Element => {
  return (
    <Table>
      <thead>
        <td>ID</td>
      </thead>
      <tbody>
        {leagues.map((league) => (
          <LeagueRow key={league.id} league={league} />
        ))}
      </tbody>
    </Table>
  );
};
