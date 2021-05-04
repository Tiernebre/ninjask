import { Repository } from "typeorm";
import { getRandomInt } from "../random";
import { DraftEntity } from "./draft.entity";

export const seedDrafts = async (
  repository: Repository<DraftEntity>,
  count = 20
): Promise<DraftEntity[]> => {
  const drafts = [];
  for (let i = 0; i < count; i++) {
    const draft = repository.create();
    draft.poolSize = getRandomInt(1, 40);
    drafts.push(draft);
  }
  return repository.save(drafts);
};
