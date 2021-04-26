import { render, screen } from '@testing-library/react'
import { Challenge } from '../../api/challenge'
import { ChallengeTable } from './ChallengeTable'

it('renders given challenges', () => {
  const challenges: Challenge[] = [
    {
      id: 1,
      name: 'Test Challenge 1',
      description: 'The first challenge',
      versionId: 1
    },
    {
      id: 2,
      name: 'Test Challenge 2',
      description: 'The second challenge',
      versionId: 2
    }
  ]
  render(<ChallengeTable challenges={challenges} />)
  challenges.forEach(challenge => {
    expect(screen.getByText(challenge.name)).toBeInTheDocument()
    expect(screen.getByText(challenge.description)).toBeInTheDocument()
  })
})
