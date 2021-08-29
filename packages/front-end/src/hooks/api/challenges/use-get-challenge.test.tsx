import { renderHook, act } from "@testing-library/react-hooks";
import { PropsWithChildren } from "react";
import { ISessionContext } from "../..";
import {
  MockSessionContextProvider,
  generateMockSessionContext,
} from "../../../../test";
import { challengeDrafts, challenges } from "../../../../test/mocks";
import { SessionPayload } from "../../../api";
import { useGetChallenge } from "./use-get-challenge";

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
  const expectedDraft = challengeDrafts[challengeId];
  const { result } = renderHook(() => useGetChallenge({ challengeId }), {
    wrapper: wrapper(generateMockSessionContext()),
  });
  expect(result.current.challenge).toBeUndefined();
  expect(result.current.draft).toBeUndefined();

  await act(async () => {
    await result.current.fetchChallenge();
  });
  expect(result.current.challenge).toStrictEqual(expectedChallenge);
  expect(result.current.draft).toStrictEqual(expectedDraft);
});

it("informs if the current user owns the fetched challenge", async () => {
  const context = generateMockSessionContext();
  const sessionPayload = context.sessionPayload as SessionPayload;
  const challengeId = Number(Object.keys(challenges)[0]);
  const expectedChallenge = challenges[challengeId];
  expectedChallenge.creatorId = sessionPayload.userId;
  challenges[challengeId] = expectedChallenge;
  const { result } = renderHook(() => useGetChallenge({ challengeId }), {
    wrapper: wrapper(context),
  });

  await act(async () => {
    await result.current.fetchChallenge();
  });
  expect(result.current.userOwnsChallenge).toEqual(true);
});

it("informs if the current user does not own the fetched challenge", async () => {
  const context = generateMockSessionContext();
  const sessionPayload = context.sessionPayload as SessionPayload;
  const challengeId = Number(Object.keys(challenges)[0]);
  const expectedChallenge = challenges[challengeId];
  expectedChallenge.creatorId = sessionPayload.userId + 1;
  challenges[challengeId] = expectedChallenge;
  const { result } = renderHook(() => useGetChallenge({ challengeId }), {
    wrapper: wrapper(context),
  });

  await act(async () => {
    await result.current.fetchChallenge();
  });
  expect(result.current.userOwnsChallenge).toEqual(false);
});

it("deletes a challenge", async () => {
  const challengeId = Number(Object.keys(challenges)[0]);
  const { result } = renderHook(() => useGetChallenge({ challengeId }), {
    wrapper: wrapper(generateMockSessionContext()),
  });
  expect(result.current.challenge).toBeUndefined();

  await act(async () => {
    await result.current.fetchChallenge();
  });
  await act(async () => {
    await result.current.deleteChallenge();
  });
  expect(result.current.challenge).toBeUndefined();
});
