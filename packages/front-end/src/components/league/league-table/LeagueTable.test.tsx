import { render, screen } from "@testing-library/react";
import { generateLeague } from "../../../../test/mocks/league";
import { LeagueTable } from "./LeagueTable";

it("displays the correct information", () => {
  const leagues = [generateLeague(), generateLeague()];
  render(<LeagueTable leagues={leagues} />);
  leagues.forEach((league) => {
    expect(screen.getByText(league.name)).toBeInTheDocument();
    expect(screen.getByText(league.description)).toBeInTheDocument();
  });
});
