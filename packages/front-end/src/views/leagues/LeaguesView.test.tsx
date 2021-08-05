import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MockSessionContextProvider } from "../../../test";
import { LeaguesView } from "./LeaguesView";
import { leagues } from "../../../test/mocks/league";
import { MemoryRouter } from "react-router-dom";

it("displays the leagues in a table", async () => {
  render(
    <MemoryRouter>
      <>
        <MockSessionContextProvider>
          <LeaguesView />
        </MockSessionContextProvider>
      </>
    </MemoryRouter>
  );
  await waitForElementToBeRemoved(() => screen.getByLabelText(/Loading/i));
  Object.values(leagues).forEach((league) => {
    expect(screen.getByText(league.name)).toBeInTheDocument();
    expect(screen.getByText(league.description)).toBeInTheDocument();
  });
});
