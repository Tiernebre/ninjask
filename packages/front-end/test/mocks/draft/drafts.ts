import { Draft, Pokemon } from "../../../src/api";
import { Writeable } from "../../types/writeable";
import { generatePokemon } from "../pokemon/generate";
import { generateDraft } from "./generate";

const createMockDrafts = (): Record<number, Writeable<Draft>> => {
  const drafts = {};
  for (let i = 0; i < 20; i++) {
    const draft = generateDraft();
    drafts[draft.id] = draft;
  }
  return drafts;
};

const drafts = createMockDrafts();

const createMockDraftPools = (): Record<number, Writeable<Pokemon>[]> => {
  const draftPools = {};
  Object.values(drafts).forEach((draft) => {
    draftPools[draft.id] = generatePokemon();
  });
  return draftPools;
};
const draftPools = createMockDraftPools();

export { drafts, draftPools };
