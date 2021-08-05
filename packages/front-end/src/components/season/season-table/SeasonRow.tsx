import { Season } from "../../../api";

type SeasonRowProps = {
  season: Season;
};

export const SeasonRow = ({ season }: SeasonRowProps): JSX.Element => {
  return (
    <tr>
      <td>{season.id}</td>
      <td>{season.name}</td>
      <td>{season.description}</td>
    </tr>
  );
};
