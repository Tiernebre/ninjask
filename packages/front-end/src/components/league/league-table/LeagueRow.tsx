import { League } from "../../../api";

type LeagueRowProps = {
  league: League;
};

export const LeagueRow = ({ league }: LeagueRowProps): JSX.Element => (
  <tr>
    <td>{league.name}</td>
    <td>{league.description}</td>
  </tr>
);
