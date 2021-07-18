import { renderHook } from "@testing-library/react-hooks";
import { SessionProvider, useSession } from "./use-session";

it("has the correct initial values", () => {
  const { result } = renderHook(() => useSession(), {
    wrapper: SessionProvider,
  });
  expect(result.current.session).toBeUndefined();
  expect(result.current.accessToken).toBeUndefined();
  expect(result.current.setSession).toBeTruthy();
});
