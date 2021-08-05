import { render, screen } from "@testing-library/react";
import { generateSeason } from "../../../../test";
import { SeasonRow } from "./SeasonRow";

it("displays the correct information about a season", () => {
  const table = document.createElement("table");
  const tableBody = document.createElement("tbody");
  table.appendChild(tableBody);
  const season = generateSeason();
  render(<SeasonRow season={season} />, {
    container: document.body.appendChild(tableBody),
  });
  expect(screen.getByText(season.id.toString())).toBeInTheDocument();
  expect(screen.getByText(season.name)).toBeInTheDocument();
  expect(screen.getByText(season.description)).toBeInTheDocument();
});
