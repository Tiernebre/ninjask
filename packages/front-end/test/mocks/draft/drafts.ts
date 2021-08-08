import { Draft } from "../../../src/api";
import { Writeable } from "../../types/writeable";
import { generateDraft } from "./generate";

const createMockDrafts = (): Record<number, Writeable<Draft>> => {
  const drafts = {};
  for (let i = 0; i < 20; i++) {
    const draft = generateDraft();
    drafts[draft.id] = draft;
  }
  return drafts;
};

export const drafts = createMockDrafts();
