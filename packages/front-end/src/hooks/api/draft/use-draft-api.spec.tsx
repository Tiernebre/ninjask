import { renderHook } from "@testing-library/react-hooks";
import { PropsWithChildren } from "react";
import { MockSessionContextProvider } from "../../../../test";
import { draftPools, drafts } from "../../../../test/mocks/draft";
import { useDraftApi } from "./use-draft-api";

const wrapper = ({ children }: PropsWithChildren<unknown>): JSX.Element => (
  <MockSessionContextProvider>{children}</MockSessionContextProvider>
);

it("gets a draft pool", async () => {
  const [expectedDraft] = Object.values(drafts);
  const expectedPool = draftPools[expectedDraft.id];
  const { result } = renderHook(() => useDraftApi(), { wrapper });
  await expect(
    result.current.getPoolForDraft(expectedDraft.id)
  ).resolves.toStrictEqual(expectedPool);
});
