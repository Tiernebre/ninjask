import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import { MockSessionContextProvider } from "../../../test";
import { SeasonView } from "./SeasonView";
import { Router } from "react-router";
import { Route } from "react-router-dom";
import { seasons, seasonChallenges } from "../../../test/mocks";

it("displays information about the season", async () => {
  const history = createMemoryHistory();
  const [seasonToTest] = Object.values(seasons);
  const challengesToTest = seasonChallenges[seasonToTest.id];
  history.push(`/seasons/${seasonToTest.id}`);
  render(
    <Router history={history}>
      <Route path="/seasons/:id">
        <MockSessionContextProvider>
          <SeasonView />
        </MockSessionContextProvider>
      </Route>
    </Router>
  );
  await waitForElementToBeRemoved(() => screen.getByLabelText(/Loading/i));
  expect(screen.getByText(seasonToTest.name)).toBeInTheDocument();
  expect(screen.getByText(seasonToTest.description)).toBeInTheDocument();
  challengesToTest.forEach((season) => {
    expect(screen.getByText(season.name)).toBeInTheDocument();
    expect(screen.getByText(season.description)).toBeInTheDocument();
  });
});
