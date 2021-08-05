import { Table } from "@tiernebre/kecleon";
import { Season } from "../../../api";
import { SeasonRow } from "./SeasonRow";

type SeasonTableProps = {
  seasons: Season[];
};

export const SeasonTable = ({ seasons }: SeasonTableProps): JSX.Element => {
  return (
    <Table>
      <thead>
        <tr>
          <td>ID</td>
          <td>Name</td>
          <td>Description</td>
        </tr>
      </thead>
      <tbody>
        {seasons.map((season) => (
          <SeasonRow key={season.id} season={season} />
        ))}
      </tbody>
    </Table>
  );
};
