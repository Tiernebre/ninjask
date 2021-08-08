import { Draft, DraftSelection, Pokemon } from "../../../src/api";
import { Writeable } from "../../types/writeable";
import { generateManyPokemon } from "../pokemon/generate";
import { generateDraft } from "./generate";
import { generateDraftSelections } from "../draft-selection";

const createMockDrafts = (): Record<number, Writeable<Draft>> => {
  const drafts: Record<number, Writeable<Draft>> = {};
  for (let i = 0; i < 20; i++) {
    const draft = generateDraft();
    drafts[draft.id] = draft;
  }
  return drafts;
};

const drafts = createMockDrafts();

const createMockDraftPools = (): Record<number, Writeable<Pokemon>[]> => {
  const draftPools: Record<number, Writeable<Pokemon[]>> = {};
  Object.values(drafts).forEach((draft) => {
    const pokemon = generateManyPokemon();
    draftPools[draft.id] = pokemon;
  });
  return draftPools;
};
const draftPools = createMockDraftPools();

const createMockDraftSelections = (): Record<
  number,
  Writeable<DraftSelection[]>
> => {
  const draftSelections: Record<number, Writeable<DraftSelection[]>> = {};
  Object.values(drafts).forEach((draft) => {
    draftSelections[draft.id] = generateDraftSelections();
  });
  return draftSelections;
};
const draftSelections = createMockDraftSelections();

export { drafts, draftPools, draftSelections };
