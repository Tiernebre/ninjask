import { renderHook } from "@testing-library/react-hooks";
import { PropsWithChildren } from "react";
import { MockSessionContextProvider, seasons } from "../../../../test";
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
