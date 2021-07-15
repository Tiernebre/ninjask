import { render, screen, waitFor } from "@testing-library/react";
import { Navbar } from "./Navbar";
import user from "@testing-library/user-event";
import { MemoryRouter } from "react-router";

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
