import { createAdminAuthenticationMiddleware } from "./auth.middleware";

it.each([null, undefined, "", NaN])(
  "throws an error if username provided is %p",
  (username: unknown) => {
    expect(() =>
      createAdminAuthenticationMiddleware(username as string, "password")
    ).toThrowError();
  }
);

it.each([null, undefined, "", NaN])(
  "throws an error if password provided is %p",
  (password: unknown) => {
    expect(() =>
      createAdminAuthenticationMiddleware("username", password as string)
    ).toThrowError();
  }
);

it("returns proper middleware if username and password provided are valid", () => {
  expect(
    createAdminAuthenticationMiddleware("username", "password")
  ).toBeTruthy();
});
