import { renderHook, act } from "@testing-library/react-hooks";
import { PropsWithChildren } from "react";
import { MockSessionContextProvider } from "../../../../test";
import { leagues } from "../../../../test/mocks/league";
import { useGetLeague } from "./use-get-league";

const wrapper = ({ children }: PropsWithChildren<unknown>): JSX.Element => (
  <MockSessionContextProvider>{children}</MockSessionContextProvider>
);

it("fetches a league and stores it statefully", async () => {
  const [expectedLeague] = Object.values(leagues);
  const { id } = expectedLeague;
  const { result } = renderHook(() => useGetLeague({ id }), { wrapper });
  expect(result.current.league).toBeUndefined();
  await act(async () => {
    await result.current.fetchLeague();
  });
  expect(result.current.league).toEqual(expectedLeague);
});
