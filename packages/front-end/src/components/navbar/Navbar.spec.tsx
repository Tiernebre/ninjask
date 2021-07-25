import { render, screen, waitFor } from "@testing-library/react";
import { Navbar } from "./Navbar";
import user from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { Route } from "react-router-dom";

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

it("shows challenges route when challenges link is clicked", () => {
  render(
    <MemoryRouter>
      <Navbar isAuthenticated={false} onLogOut={jest.fn()} />
      <Route path="/challenges" exact>
        Challenges View
      </Route>
    </MemoryRouter>
  );
  user.click(screen.getByRole("link", { name: "Challenges" }));
  expect(screen.getByText("Challenges View")).toBeInTheDocument();
});
