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
  const pokemonDbUrl= screen.getByRole("link", { name: /PokemonDB/i })
  expect(pokemonDbUrl).toHaveAttribute("href", `https://pokemondb.net/pokedex/${pokemon.name}`)
  const bulbapediaUrl = screen.getByRole("link", { name: /Bulbapedia/i })
  expect(bulbapediaUrl).toHaveAttribute("href", `https://bulbapedia.bulbagarden.net/wiki/${pokemon.name}_(Pok%C3%A9mon)`)
});
