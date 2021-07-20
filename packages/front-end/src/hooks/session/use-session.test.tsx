import { renderHook, act } from "@testing-library/react-hooks";
import { Session } from "../../api";
import { SessionProvider, useSession } from "./use-session";
import { v4 as uuid } from "uuid";

it("has the correct initial values", () => {
  const { result } = renderHook(() => useSession(), {
    wrapper: SessionProvider,
  });
  expect(result.current.session).toBeUndefined();
  expect(result.current.accessToken).toBeUndefined();
  expect(result.current.setSession).toBeTruthy();
});

it("can update the session", () => {
  const { result } = renderHook(() => useSession(), {
    wrapper: SessionProvider,
  });
  const session: Session = {
    accessToken: uuid(),
    accessTokenExpiration: 0,
  };
  act(() => {
    result.current.setSession(session);
  });
  expect(result.current.session).toEqual(session);
  expect(result.current.accessToken).toEqual(session.accessToken);
});
