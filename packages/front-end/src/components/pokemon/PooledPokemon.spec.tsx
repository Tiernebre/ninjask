import { render, screen } from '@testing-library/react'
import { Pokemon } from '../../api/pokemon'
import { PooledPokemon } from './PooledPokemon'


it("displays the pokemon names given to it", () => {
  const pokemon: Pokemon[] = [
    {
      id: 1,
      name: 'Pikachu',
      imageUrl: '',
      iconUrl: ''
    },
    {
      id: 2,
      name: 'Squirtle',
      imageUrl: '',
      iconUrl: ''
    }
  ]
  render(<PooledPokemon pokemon={pokemon} />)
  pokemon.forEach(individualPokemon => {
    expect(screen.getByText(individualPokemon.name)).toBeInTheDocument()
  })
})