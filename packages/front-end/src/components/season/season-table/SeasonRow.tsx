import { Link } from "react-router-dom";
import { Season } from "../../../api";

type SeasonRowProps = {
  season: Season;
};

export const SeasonRow = ({ season }: SeasonRowProps): JSX.Element => {
  return (
    <tr>
      <td>
        <Link to={`/seasons/${season.id}`}>{season.name}</Link>
      </td>
      <td>{season.description}</td>
    </tr>
  );
};
