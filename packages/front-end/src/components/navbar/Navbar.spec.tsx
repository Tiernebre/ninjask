import { render, screen, waitFor } from "@testing-library/react";
import { Navbar } from "./Navbar";
import user from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { Route } from "react-router-dom";

const getHeaderLinks = (): HTMLElement[] => {
  const challengeLink = screen.queryByRole("link", { name: "Challenges" });
  const leaguesLink = screen.queryByRole("link", { name: "Leagues" });
  return [challengeLink, leaguesLink].filter(
    (link) => link !== null
  ) as HTMLElement[];
};

it("logs the user out if they are logged in", async () => {
  const onLogOut = jest.fn();
  render(
    <MemoryRouter>
      <Navbar isAuthenticated={true} onLogOut={onLogOut} />
    </MemoryRouter>
  );
  const logoutButton = screen.getByRole("button", { name: /Log Out/g });
  user.click(logoutButton);
  await waitFor(() => expect(onLogOut).toHaveBeenCalledTimes(1));
});

it("does not show the logout button if the user is not logged in", () => {
  render(
    <MemoryRouter>
      <Navbar isAuthenticated={false} onLogOut={jest.fn()} />
    </MemoryRouter>
  );
  const logoutButton = screen.queryByRole("button", { name: /Log Out/g });
  expect(logoutButton).toBeNull();
});

it("does not show any header links if the user is not logged in", () => {
  render(
    <MemoryRouter>
      <Navbar isAuthenticated={false} onLogOut={jest.fn()} />
    </MemoryRouter>
  );
  expect(getHeaderLinks()).toHaveLength(0);
});

it("shows header links if the user is logged in", () => {
  render(
    <MemoryRouter>
      <Navbar isAuthenticated={true} onLogOut={jest.fn()} />
    </MemoryRouter>
  );
  expect(getHeaderLinks().length).toBeGreaterThan(0);
});

it("shows challenges route when challenges link is clicked", () => {
  render(
    <MemoryRouter>
      <Navbar isAuthenticated={true} onLogOut={jest.fn()} />
      <Route path="/challenges" exact>
        Challenges View
      </Route>
    </MemoryRouter>
  );
  user.click(screen.getByRole("link", { name: "Challenges" }));
  expect(screen.getByText("Challenges View")).toBeInTheDocument();
});

it("shows leagues route when leagues link is clicked", () => {
  render(
    <MemoryRouter>
      <Navbar isAuthenticated={true} onLogOut={jest.fn()} />
      <Route path="/leagues" exact>
        Leagues View
      </Route>
    </MemoryRouter>
  );
  user.click(screen.getByRole("link", { name: "Leagues" }));
  expect(screen.getByText("Leagues View")).toBeInTheDocument();
});
