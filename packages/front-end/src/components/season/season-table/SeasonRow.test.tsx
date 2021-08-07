import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { generateSeason } from "../../../../test";
import { SeasonRow } from "./SeasonRow";
import user from "@testing-library/user-event";

it("displays the correct information about a season", () => {
  const season = generateSeason();
  render(
    <MemoryRouter>
      <>
        <table>
          <tbody>
            <SeasonRow season={season} />
          </tbody>
        </table>
        <Route path="/seasons/:id">Dynamic Season Loaded!</Route>
      </>
    </MemoryRouter>
  );
  const name = screen.getByText(season.name);
  expect(name).toBeInTheDocument();
  expect(screen.getByText(season.description)).toBeInTheDocument();
  user.click(name);
  expect(screen.getByText("Dynamic Season Loaded!")).toBeInTheDocument();
});
