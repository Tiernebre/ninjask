import { renderHook, act } from "@testing-library/react-hooks";
import { PropsWithChildren } from "react";
import { MockSessionContextProvider, seasons } from "../../../../test";
import { useGetSeasons } from "./use-get-seasons";

const wrapper = ({ children }: PropsWithChildren<unknown>): JSX.Element => (
  <MockSessionContextProvider>{children}</MockSessionContextProvider>
);

it("fetches information about seasons and stores it statefully", async () => {
  const { result } = renderHook(() => useGetSeasons(), { wrapper });
  expect(result.current.seasons).toEqual([]);
  await act(async () => {
    await result.current.fetchSeasons();
  });
  expect(result.current.seasons).toEqual(Object.values(seasons));
});
