import { Link } from "react-router-dom";
import { League } from "../../../api";

type LeagueRowProps = {
  league: League;
};

export const LeagueRow = ({ league }: LeagueRowProps): JSX.Element => (
  <tr>
    <td>
      <Link to={`/leagues/${league.id}`}>{league.name}</Link>
    </td>
    <td>{league.description}</td>
  </tr>
);
