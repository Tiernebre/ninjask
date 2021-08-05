import { render, screen } from "@testing-library/react";
import { generateLeague } from "../../../../test/mocks/league";
import { LeagueRow } from "./LeagueRow";

it("displays the correct information", () => {
  const table = document.createElement("table");
  const tableBody = document.createElement("tbody");
  table.appendChild(tableBody);
  const league = generateLeague();
  render(<LeagueRow league={league} />, {
    container: document.body.appendChild(tableBody),
  });
  expect(screen.getByText(league.name)).toBeInTheDocument();
  expect(screen.getByText(league.description)).toBeInTheDocument();
});
