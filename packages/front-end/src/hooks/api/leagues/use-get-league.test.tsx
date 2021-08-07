import { renderHook, act } from "@testing-library/react-hooks";
import { PropsWithChildren } from "react";
import { MockSessionContextProvider } from "../../../../test";
import {
  leagueChallenges,
  leagues,
  leagueSeasons,
} from "../../../../test/mocks/league";
import { useGetLeague } from "./use-get-league";

const wrapper = ({ children }: PropsWithChildren<unknown>): JSX.Element => (
  <MockSessionContextProvider>{children}</MockSessionContextProvider>
);

it("fetches information about a league and stores it statefully", async () => {
  const [expectedLeague] = Object.values(leagues);
  const expectedLeagueSeasons = leagueSeasons[expectedLeague.id];
  const expectedLeagueChallenges = leagueChallenges[expectedLeague.id];
  const { id } = expectedLeague;
  const { result } = renderHook(() => useGetLeague({ id }), { wrapper });
  expect(result.current.loaded).toEqual(false);
  expect(result.current.league).toBeUndefined();
  expect(result.current.seasons).toEqual([]);
  expect(result.current.challenges).toEqual([]);
  await act(async () => {
    await result.current.fetchLeague();
  });
  expect(result.current.loaded).toEqual(true);
  expect(result.current.league).toEqual(expectedLeague);
  expect(result.current.seasons).toEqual(expectedLeagueSeasons);
  expect(result.current.challenges).toEqual(expectedLeagueChallenges);
});
