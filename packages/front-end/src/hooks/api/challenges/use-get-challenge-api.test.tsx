import { renderHook, act } from "@testing-library/react-hooks";
import { PropsWithChildren } from "react";
import { MockSessionContextProvider } from "../../../../test";
import { challenges } from "../../../../test/mocks";
import { useGetChallengeApi } from "./use-get-challenge-api";

const wrapper = ({ children }: PropsWithChildren<unknown>): JSX.Element => (
  <MockSessionContextProvider>{children}</MockSessionContextProvider>
);

it("fetches a challenge", async () => {
  const challengeId = Number(Object.keys(challenges)[0]);
  const expectedChallenge = challenges[challengeId];
  const { result } = renderHook(() => useGetChallengeApi({ challengeId }), {
    wrapper,
  });

  await act(async () => {
    await result.current.fetchChallenge();
  });
  expect(result.current.challenge).toEqual(expectedChallenge);
});

it("informs if the current user owns the fetched challenge", async () => {
  const challengeId = Number(Object.keys(challenges)[0]);
  const expectedChallenge = challenges[challengeId];
  const { result } = renderHook(() => useGetChallengeApi({ challengeId }), {
    wrapper,
  });

  await act(async () => {
    await result.current.fetchChallenge();
  });
  expect(result.current.challenge).toEqual(expectedChallenge);
});
