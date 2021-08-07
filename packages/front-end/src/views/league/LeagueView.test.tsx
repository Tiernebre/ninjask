import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import { MockSessionContextProvider } from "../../../test";
import { LeagueView } from "./LeagueView";
import { Router } from "react-router";
import { Route } from "react-router-dom";
import { leagues, leagueSeasons } from "../../../test/mocks/league";

it("displays information about the league", async () => {
  const history = createMemoryHistory();
  const [leagueToTest] = Object.values(leagues);
  const seasonsToTest = leagueSeasons[leagueToTest.id];
  history.push(`/leagues/${leagueToTest.id}`);
  render(
    <Router history={history}>
      <Route path="/leagues/:id">
        <MockSessionContextProvider>
          <LeagueView />
        </MockSessionContextProvider>
      </Route>
    </Router>
  );
  await waitForElementToBeRemoved(() => screen.getByLabelText(/Loading/i));
  expect(screen.getByText(leagueToTest.name)).toBeInTheDocument();
  expect(screen.getByText(leagueToTest.description)).toBeInTheDocument();
  seasonsToTest.forEach((season) => {
    expect(screen.getByText(season.name)).toBeInTheDocument();
    expect(screen.getByText(season.description)).toBeInTheDocument();
  });
});
