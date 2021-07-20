import { renderHook, act } from "@testing-library/react-hooks";
import { AlertsProvider } from "@tiernebre/kecleon";
import { PropsWithChildren } from "react";
import { ISessionContext } from "../..";
import {
  MockSessionContextProvider,
  generateMockSessionContext,
} from "../../../../test";
import { challengeResults, challenges } from "../../../../test/mocks";
import { SessionPayload } from "../../../api";
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

it("can find the existing result for a user for a given challenge", async () => {
  const context = generateMockSessionContext();
  const sessionPayload = context.sessionPayload as SessionPayload;
  const challengeId = Number(Object.keys(challenges)[0]);
  const expectedChallengeResults = challengeResults[challengeId];
  const [expectedChallengeResult] = expectedChallengeResults;
  expectedChallengeResult.participantId = sessionPayload.userId;
  const { result } = renderHook(() => useChallengeResultsApi({ challengeId }), {
    wrapper: wrapper(context),
  });

  await act(async () => {
    await result.current.fetchChallengeResults();
  });
  expect(result.current.existingResultForUser).toEqual(expectedChallengeResult);
  expect(result.current.userIsInChallenge).toEqual(true);
});

it("will not find an existing result if the user does not have a result", async () => {
  const context = generateMockSessionContext();
  const sessionPayload = context.sessionPayload as SessionPayload;
  const challengeId = Number(Object.keys(challenges)[0]);
  const expectedChallengeResults = challengeResults[challengeId];
  const [expectedChallengeResult] = expectedChallengeResults;
  expectedChallengeResult.participantId = sessionPayload.userId + 1;
  const { result } = renderHook(() => useChallengeResultsApi({ challengeId }), {
    wrapper: wrapper(context),
  });

  await act(async () => {
    await result.current.fetchChallengeResults();
  });
  expect(result.current.existingResultForUser).toBeUndefined();
  expect(result.current.userIsInChallenge).toEqual(false);
});

it("can add a user to the challenge", async () => {
  const context = generateMockSessionContext();
  const challengeId = Number(Object.keys(challenges)[0]);
  const expectedChallengeResults = challengeResults[challengeId];
  const originalLength = expectedChallengeResults.length;
  const { result } = renderHook(() => useChallengeResultsApi({ challengeId }), {
    wrapper: wrapper(context),
  });

  await act(async () => {
    await result.current.fetchChallengeResults();
    await result.current.addUserToChallenge();
  });
  expect(originalLength + 1).toEqual(result.current.results?.length);
});
