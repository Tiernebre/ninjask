import { render, screen, waitFor } from "@testing-library/react";
import { Navbar } from "./Navbar";
import user from "@testing-library/user-event";
import { MemoryRouter } from "react-router";

const getMenu = () => screen.getByRole("menu");

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

it("hides the menu by default", () => {
  render(
    <MemoryRouter>
      <Navbar isAuthenticated={false} onLogOut={jest.fn()} />
    </MemoryRouter>
  );
  const menu = getMenu();
  expect(menu).not.toHaveClass("is-active");
});

it("shows the menu when the open menu button is clicked", () => {
  render(
    <MemoryRouter>
      <Navbar isAuthenticated={false} onLogOut={jest.fn()} />
    </MemoryRouter>
  );
  const openMenuButton = screen.getByRole("button", { name: "Open Menu" });
  user.click(openMenuButton);
  const menu = getMenu();
  expect(menu).toHaveClass("is-active");
});
