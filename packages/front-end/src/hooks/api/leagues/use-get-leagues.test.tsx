import { renderHook, act } from "@testing-library/react-hooks";
import { PropsWithChildren } from "react";
import { MockSessionContextProvider } from "../../../../test";
import { leagues } from "../../../../test/mocks/league";
import { useGetLeagues } from "./use-get-leagues";

const wrapper = ({ children }: PropsWithChildren<unknown>): JSX.Element => (
  <MockSessionContextProvider>{children}</MockSessionContextProvider>
);

it("fetches leagues and stores them statefully", async () => {
  const { result } = renderHook(() => useGetLeagues(), { wrapper });
  expect(result.current.leagues).toEqual([]);
  await act(async () => {
    await result.current.fetchLeagues();
  });
  expect(result.current.leagues).toEqual(Object.values(leagues));
});
