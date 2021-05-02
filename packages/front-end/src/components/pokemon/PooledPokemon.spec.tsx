import { render, screen } from "@testing-library/react";
import { Pokemon } from "../../api/pokemon";
import { PooledPokemon } from "./PooledPokemon";

it("correctly renders the pokemon given to it", () => {
  const pokemon: Pokemon[] = [
    {
      id: 1,
      name: "Pikachu",
      imageUrls: {
        thumbnail: "pikachu-thumbnail.jpg",
        image: "pikachu.jpg",
        icon: "pikachu-icon.png",
      },
    },
    {
      id: 2,
      name: "Squirtle",
      imageUrls: {
        thumbnail: "squirtle-thumbnail.jpg",
        image: "squirtle.jpg",
        icon: "squirtle-icon.png",
      },
    },
  ];
  render(<PooledPokemon pokemon={pokemon} />);
  pokemon.forEach((individualPokemon) => {
    expect(screen.getByText(individualPokemon.name)).toBeInTheDocument();
    const pokemonImage = screen.getByAltText(individualPokemon.name);
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage).toHaveAttribute(
      "src",
      individualPokemon.imageUrls.icon
    );
  });
});
