import { render, screen } from "@testing-library/react";
import { SeasonTable } from ".";
import { generateSeason } from "../../../../test";

it("displays information about multiple seasons", () => {
  const seasons = [generateSeason(), generateSeason()];
  render(<SeasonTable seasons={seasons} />);
  seasons.forEach((season) => {
    expect(screen.getByText(season.id.toString())).toBeInTheDocument();
    expect(screen.getByText(season.name)).toBeInTheDocument();
    expect(screen.getByText(season.description)).toBeInTheDocument();
  });
});
