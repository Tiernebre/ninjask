import { renderHook, act } from "@testing-library/react-hooks";
import { PropsWithChildren } from "react";
import { ISessionContext } from "../..";
import {
  MockSessionContextProvider,
  generateMockSessionContext,
} from "../../../../test";
import { challenges } from "../../../../test/mocks";
import { useChallengeResultsApi } from "./use-challenge-results-api";

const wrapper =
  (value: ISessionContext) =>
  ({ children }: PropsWithChildren<unknown>): JSX.Element =>
    (
      <MockSessionContextProvider value={value}>
        {children}
      </MockSessionContextProvider>
    );

it("fetches a challenge", async () => {
  const challengeId = Number(Object.keys(challenges)[0]);
  const expectedChallenge = challenges[challengeId];
  const { result } = renderHook(() => useChallengeResultsApi({ challengeId }), {
    wrapper: wrapper(generateMockSessionContext()),
  });

  await act(async () => {
    await result.current.fetchChallengeResults();
  });
  expect(result.current.results).toEqual(expectedChallenge);
});
