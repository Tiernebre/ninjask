import { renderHook } from "@testing-library/react-hooks";
import { PropsWithChildren } from "react";
import {
  MockSessionContextProvider,
  seasonChallenges,
  seasons,
} from "../../../../test";
import { useSeasonsApi } from "./use-season-api";

const wrapper = ({ children }: PropsWithChildren<unknown>): JSX.Element => (
  <MockSessionContextProvider>{children}</MockSessionContextProvider>
);

it("gets seasons", async () => {
  const { result } = renderHook(() => useSeasonsApi(), { wrapper });
  await expect(result.current.getSeasons()).resolves.toEqual(
    Object.values(seasons)
  );
});

it("gets a season by id", async () => {
  const [expectedSeason] = Object.values(seasons);
  const { result } = renderHook(() => useSeasonsApi(), { wrapper });
  await expect(
    result.current.getSeasonById(expectedSeason.id)
  ).resolves.toEqual(expectedSeason);
});

it("throws an error if a season ID is given for one that does not exist", async () => {
  const { result } = renderHook(() => useSeasonsApi(), { wrapper });
  await expect(result.current.getSeasonById(10000)).rejects.toThrowError();
});

it("gets challenges for a given season ID", async () => {
  const [expectedSeason] = Object.values(seasons);
  const expectedChallenges = seasonChallenges[expectedSeason.id];
  const { result } = renderHook(() => useSeasonsApi(), { wrapper });
  await expect(
    result.current.getChallengesForOne(expectedSeason.id)
  ).resolves.toEqual(expectedChallenges);
});
