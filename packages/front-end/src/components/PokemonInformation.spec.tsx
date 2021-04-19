import { render, screen } from "@testing-library/react";
import { Pokemon } from "../api/pokemon";
import { PokemonInformation } from "./PokemonInformation";

it("renders pokemon name", () => {
  const pokemon: Pokemon = {
    id: 1,
    name: "Pikachu",
    imageUrl: "foo",
    iconUrl: "foo",
  };
  render(<PokemonInformation pokemon={pokemon} emptyPlaceholder="hello" />);
  const pokemonName = screen.getByText(pokemon.name);
  expect(pokemonName).toBeInTheDocument();
});

it("renders a provided empty placeholder if a pokemon is not provided", () => {
  const emptyPlaceholderText = "Empty Placeholder";
  render(<PokemonInformation emptyPlaceholder={emptyPlaceholderText} />);
  const emptyPlaceholder = screen.getByText(emptyPlaceholderText);
  expect(emptyPlaceholder).toBeInTheDocument();
});
