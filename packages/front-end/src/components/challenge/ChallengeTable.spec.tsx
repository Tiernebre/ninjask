import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router";
import { Challenge } from "../../api/challenge";
import { ChallengeTable } from "./ChallengeTable";
import user from '@testing-library/user-event';

it("renders given challenges", () => {
  const challenges: Challenge[] = [
    {
      id: 1,
      name: "Test Challenge 1",
      description: "The first challenge",
      versionId: 1,
    },
    {
      id: 2,
      name: "Test Challenge 2",
      description: "The second challenge",
      versionId: 2,
    },
  ];

  render(
    <MemoryRouter>
      <ChallengeTable challenges={challenges} />
      {challenges.map(challenge => (
        <Route path={`/challenges/${challenge.id}/draft`}>
          {challenge.name} Draft
        </Route>
      ))}
    </MemoryRouter>
  );
  challenges.forEach((challenge, index) => {
    expect(screen.getByText(challenge.name)).toBeInTheDocument();
    expect(screen.getByText(challenge.description)).toBeInTheDocument();
    const links = screen.getAllByRole('link', { name: /draft/i })
    user.click(links[index])
    expect(screen.getByText(`${challenge.name} Draft`)).toBeInTheDocument()
  });
});

