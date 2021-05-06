import { render, screen } from "@testing-library/react";
import { Pokemon } from "../../api/pokemon";
import { PokemonCard } from "./PokemonCard";

it("displays correct information about a given pokemon", () => {
  const pokemon: Pokemon = {
    id: 1,
    name: "bulbasaur",
    imageUrls: {
      thumbnail: "bulbasaur-thumbnail.png",
      image: "bulbasaur.png",
      icon: "bulbasaur-icon.jpg",
    },
  };
  render(<PokemonCard pokemon={pokemon} />);
  expect(screen.getByText(pokemon.name)).toBeInTheDocument();
  const pokemonImage = screen.getByAltText(pokemon.name);
  expect(pokemonImage).toBeInTheDocument();
  expect(pokemonImage).toHaveAttribute("src", pokemon.imageUrls.thumbnail);
});
