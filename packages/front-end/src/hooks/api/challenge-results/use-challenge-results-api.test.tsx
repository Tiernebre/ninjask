import { renderHook, act } from "@testing-library/react-hooks";
import { AlertsProvider } from "@tiernebre/kecleon";
import { PropsWithChildren } from "react";
import { ISessionContext } from "../..";
import {
  MockSessionContextProvider,
  generateMockSessionContext,
} from "../../../../test";
import { challengeResults, challenges } from "../../../../test/mocks";
import { useChallengeResultsApi } from "./use-challenge-results-api";

const wrapper =
  (value: ISessionContext) =>
  ({ children }: PropsWithChildren<unknown>): JSX.Element =>
    (
      <AlertsProvider>
        <MockSessionContextProvider value={value}>
          {children}
        </MockSessionContextProvider>
      </AlertsProvider>
    );

it("fetches challenge results", async () => {
  const challengeId = Number(Object.keys(challenges)[0]);
  const expectedChallengeResults = challengeResults[challengeId];
  const { result } = renderHook(() => useChallengeResultsApi({ challengeId }), {
    wrapper: wrapper(generateMockSessionContext()),
  });
  expect(result.current.results).toEqual([]);

  await act(async () => {
    await result.current.fetchChallengeResults();
  });
  expect(result.current.results).toEqual(expectedChallengeResults);
});
