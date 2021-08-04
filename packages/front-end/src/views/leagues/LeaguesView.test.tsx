import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MockSessionContextProvider } from "../../../test";
import { LeaguesView } from "./LeaguesView";
import { leagues } from "../../../test/mocks/league";

it("displays the leagues in a table", async () => {
  render(
    <MockSessionContextProvider>
      <LeaguesView />
    </MockSessionContextProvider>
  );
  await waitForElementToBeRemoved(() => screen.getByLabelText(/Loading/i));
  Object.values(leagues).forEach((league) => {
    expect(screen.getByText(league.id.toString())).toBeInTheDocument();
    expect(screen.getByText(league.name)).toBeInTheDocument();
    expect(screen.getByText(league.description)).toBeInTheDocument();
  });
});
