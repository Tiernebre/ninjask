import { render, screen } from "@testing-library/react";
import { Pokemon } from "../../api/pokemon";
import { PokemonInformation } from "./PokemonInformation";

it("renders the given pokemon", () => {
  const pokemon: Pokemon = {
    id: 5,
    name: "Charmander",
    imageUrl: "charmander.jpg",
    iconUrl: "charmander-icon.png",
  };
  render(<PokemonInformation pokemon={pokemon} emptyPlaceholder="hello" />);
  const pokemonName = screen.getByText(pokemon.name);
  expect(pokemonName).toBeInTheDocument();
  const pokemonImage = screen.getByAltText(pokemon.name)
  expect(pokemonImage).toBeInTheDocument()
  expect(pokemonImage).toHaveAttribute('src', pokemon.imageUrl)
});

it("renders a provided empty placeholder if a pokemon is not provided", () => {
  const emptyPlaceholderText = "Empty Placeholder";
  render(<PokemonInformation emptyPlaceholder={emptyPlaceholderText} />);
  const emptyPlaceholder = screen.getByText(emptyPlaceholderText);
  expect(emptyPlaceholder).toBeInTheDocument();
});
