import { renderHook } from "@testing-library/react-hooks";
import { PropsWithChildren } from "react";
import {
  generateMockSessionContext,
  MockSessionContextProvider,
} from "../../test";
import { ISessionContext } from "../session";
import { useHttp } from "./use-http";

const wrapper =
  (value: ISessionContext) =>
  ({ children }: PropsWithChildren<unknown>): JSX.Element =>
    (
      <MockSessionContextProvider value={value}>
        {children}
      </MockSessionContextProvider>
    );

it("returns an http client if no access token is available", () => {
  const context = generateMockSessionContext();
  context.accessToken = undefined;
  const { result } = renderHook(() => useHttp(), { wrapper: wrapper(context) });
  expect(result.current.httpClient).toBeTruthy();
});
