import { renderHook } from "@testing-library/react-hooks";
import { PropsWithChildren } from "react";
import {
  mockLeagueSeasons,
  MockSessionContextProvider,
} from "../../../../test";
import { leagues } from "../../../../test/mocks/league";
import { useLeaguesApi } from "./use-leagues-api";

const wrapper = ({ children }: PropsWithChildren<unknown>): JSX.Element => (
  <MockSessionContextProvider>{children}</MockSessionContextProvider>
);

it("gets leagues", async () => {
  const { result } = renderHook(() => useLeaguesApi(), { wrapper });
  await expect(result.current.getLeagues()).resolves.toEqual(
    Object.values(leagues)
  );
});

it("can get a league by id", async () => {
  const { result } = renderHook(() => useLeaguesApi(), { wrapper });
  const [expectedLeague] = Object.values(leagues);
  expect(expectedLeague).toBeTruthy();
  await expect(
    result.current.getLeagueById(expectedLeague.id)
  ).resolves.toEqual(expectedLeague);
});

it("throws an error if a league cannot be found by id", async () => {
  const { result } = renderHook(() => useLeaguesApi(), { wrapper });
  await expect(result.current.getLeagueById(1000)).rejects.toThrowError();
});

it("gets the seasons for a league", async () => {
  const [expectedLeague] = Object.values(leagues);
  const expectedSeasons = mockLeagueSeasons[expectedLeague.id];
  expect(expectedSeasons).toBeTruthy();
  const { result } = renderHook(() => useLeaguesApi(), { wrapper });
  await expect(
    result.current.getSeasonsForOne(expectedLeague.id)
  ).resolves.toEqual(expectedSeasons);
});
