import { render, screen } from "@testing-library/react";
import { Pokemon } from "../api/pokemon";
import { PokemonInformation } from "./PokemonInformation";

it('renders pokemon name', () => {
  const pokemon: Pokemon = {
    id: 1,
    name: 'Pikachu',
    imageUrl: 'foo',
    iconUrl: 'foo'
  }
  render(<PokemonInformation pokemon={pokemon} />);
  const pokemonName = screen.getByText(pokemon.name);
  expect(pokemonName).toBeInTheDocument();
});
