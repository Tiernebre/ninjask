import { Nullish, render, screen } from "@testing-library/react";
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
  render(<PooledPokemon pokemon={pokemon} poolSize={3} />);
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

it('displays the number of pooled pokemon out of the pool size', () => {
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
  const poolSize = 5
  render(<PooledPokemon pokemon={pokemon} poolSize={poolSize}/>);
  const banner = screen.getByRole('banner')
  expect(banner).toHaveTextContent(`Pooled Pokemon (${pokemon.length} / ${poolSize})`)
})
