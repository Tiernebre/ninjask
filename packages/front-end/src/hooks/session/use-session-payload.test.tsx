import { renderHook } from "@testing-library/react-hooks";
import { PropsWithChildren } from "react";
import { ISessionContext } from ".";
import {
  generateMockSessionContext,
  MockSessionContextProvider,
} from "../../test";
import { useSessionPayload } from "./use-session-payload";
import { v4 as uuid } from "uuid";

const wrapper =
  (value: ISessionContext) =>
  ({ children }: PropsWithChildren<unknown>): JSX.Element =>
    (
      <MockSessionContextProvider value={value}>
        {children}
      </MockSessionContextProvider>
    );

it("throws an error if the session payload does not exist", () => {
  const context = generateMockSessionContext();
  context.sessionPayload = null;
  const { result } = renderHook(() => useSessionPayload(), {
    wrapper: wrapper(context),
  });
  expect(result.error).toBeTruthy();
  expect(result.error?.message).toEqual(
    "There is no proper session, could not load Session Payload"
  );
});

it("returns the session payload", () => {
  const context = generateMockSessionContext();
  context.sessionPayload = {
    userId: 1,
    accessKey: uuid(),
  };
  const { result } = renderHook(() => useSessionPayload(), {
    wrapper: wrapper(context),
  });
  expect(result.current).toEqual(context.sessionPayload);
});
