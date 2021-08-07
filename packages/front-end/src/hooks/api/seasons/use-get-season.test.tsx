import { renderHook, act } from "@testing-library/react-hooks";
import { PropsWithChildren } from "react";
import {
  MockSessionContextProvider,
  seasonChallenges,
  seasons,
} from "../../../../test";
import { useGetSeason } from "./use-get-season";

const wrapper = ({ children }: PropsWithChildren<unknown>): JSX.Element => (
  <MockSessionContextProvider>{children}</MockSessionContextProvider>
);

it("fetches information about a specific season by id and stores it statefully", async () => {
  const [expectedSeason] = Object.values(seasons);
  const expectedChallenges = seasonChallenges[expectedSeason.id];
  const { result } = renderHook(() => useGetSeason(expectedSeason.id), {
    wrapper,
  });
  expect(result.current.season).toBeUndefined();
  expect(result.current.challenges).toEqual([]);
  await act(async () => {
    await result.current.fetchSeason();
  });
  expect(result.current.season).toEqual(expectedSeason);
  expect(result.current.challenges).toEqual(expectedChallenges);
});
