import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SeasonTable } from ".";
import { generateSeason } from "../../../../test";

it("displays information about multiple seasons", () => {
  const seasons = [generateSeason(), generateSeason()];
  render(
    <MemoryRouter>
      <SeasonTable seasons={seasons} />
    </MemoryRouter>
  );
  seasons.forEach((season) => {
    expect(screen.getByText(season.name)).toBeInTheDocument();
    expect(screen.getByText(season.description)).toBeInTheDocument();
  });
});
