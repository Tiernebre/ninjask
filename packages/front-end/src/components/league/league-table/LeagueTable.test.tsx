import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { generateLeague } from "../../../../test/mocks/league";
import { LeagueTable } from "./LeagueTable";
import user from "@testing-library/user-event";

it("displays the correct information", () => {
  const leagues = [generateLeague(), generateLeague()];
  render(
    <MemoryRouter>
      <>
        <LeagueTable leagues={leagues} />
        <Route path="/leagues/:id">Dynamic League Loaded!</Route>
      </>
    </MemoryRouter>
  );
  expect(screen.queryByText("Dynamic League Loaded!")).toBeNull();
  leagues.forEach((league) => {
    const name = screen.getByText(league.name);
    expect(name).toBeInTheDocument();
    expect(screen.getByText(league.description)).toBeInTheDocument();
    user.click(name);
    expect(screen.getByText("Dynamic League Loaded!")).toBeInTheDocument();
  });
});
