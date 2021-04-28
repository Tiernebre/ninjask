import { render, screen } from '@testing-library/react'
import { Pokemon } from '../../api/pokemon'
import { PooledPokemon } from './PooledPokemon'

it("correctly renders the pokemon given to it", () => {
  const pokemon: Pokemon[] = [
    {
      id: 1,
      name: 'Pikachu',
      imageUrl: 'pikachu.jpg',
      iconUrl: 'pikachu-icon.png'
    },
    {
      id: 2,
      name: 'Squirtle',
      imageUrl: 'squirtle.jpg',
      iconUrl: 'squirtle-icon.png'
    }
  ]
  render(<PooledPokemon pokemon={pokemon} />)
  pokemon.forEach(individualPokemon => {
    expect(screen.getByText(individualPokemon.name)).toBeInTheDocument()
    const pokemonImage = screen.getByAltText(individualPokemon.name)
    expect(pokemonImage).toBeInTheDocument()
    expect(pokemonImage).toHaveAttribute('src', individualPokemon.iconUrl)
  })
})