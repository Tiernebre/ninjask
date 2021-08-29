import { act, renderHook } from "@testing-library/react-hooks";
import { PropsWithChildren } from "react";
import { ISessionContext, useGetChallengesApi } from "../..";
import {
  challenges,
  generateMockSessionContext,
  MockSessionContextProvider,
} from "../../../../test";

const wrapper =
  (value: ISessionContext) =>
  ({ children }: PropsWithChildren<unknown>): JSX.Element =>
    (
      <MockSessionContextProvider value={value}>
        {children}
      </MockSessionContextProvider>
    );

it("fetches challenges", async () => {
  const expectedChallenges = challenges;
  const { result } = renderHook(() => useGetChallengesApi(), {
    wrapper: wrapper(generateMockSessionContext()),
  });
  await act(async () => {
    await result.current.fetchChallenges();
  });
  expect(result.current.challenges).toEqual(expectedChallenges);
});
