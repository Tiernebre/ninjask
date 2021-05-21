import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router";
import { Challenge } from "../../../api/challenge";
import { ChallengeTable } from "./ChallengeTable";
import user from "@testing-library/user-event";

it("renders given challenges", () => {
  const challenges: Challenge[] = [
    {
      id: 1,
      name: "Test Challenge 1",
      description: "The first challenge",
      versionId: 1,
      creatorId: 1,
    },
    {
      id: 2,
      name: "Test Challenge 2",
      description: "The second challenge",
      versionId: 2,
      creatorId: 1,
    },
  ];

  render(
    <MemoryRouter>
      <ChallengeTable challenges={challenges} />
      {challenges.map((challenge) => (
        <Route
          key={challenge.id}
          path={`/challenges/${challenge.id}/draft`}
          exact
        >
          {challenge.name} Draft
        </Route>
      ))}
      {challenges.map((challenge) => (
        <Route key={challenge.id} path={`/challenges/${challenge.id}`} exact>
          {challenge.name} Individual View
        </Route>
      ))}
    </MemoryRouter>
  );
  challenges.forEach((challenge, index) => {
    expect(screen.getByText(challenge.name)).toBeInTheDocument();
    expect(screen.getByText(challenge.description)).toBeInTheDocument();
    const draftLinks = screen.getAllByRole("link", { name: /draft/i });
    user.click(draftLinks[index]);
    expect(screen.getByText(`${challenge.name} Draft`)).toBeInTheDocument();
    const challengeLink = screen.getByRole("link", { name: challenge.name });
    user.click(challengeLink);
    expect(
      screen.getByText(`${challenge.name} Individual View`)
    ).toBeInTheDocument();
  });
});
