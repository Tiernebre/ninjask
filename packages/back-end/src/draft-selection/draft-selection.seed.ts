import { getRepository, Repository } from "typeorm";
import { ChallengeParticipantEntity } from "../challenge-participant";
import { DraftEntity } from "../draft/draft.entity";
import { DraftSelectionEntity } from "./draft-selection.entity";

export const clearAllDraftSelections = async (): Promise<void> => {
  await getRepository(DraftSelectionEntity).query(
    `DELETE FROM draft_selection`
  );
};

export const seedDraftSelections = async (
  repository: Repository<DraftSelectionEntity>,
  participant: ChallengeParticipantEntity,
  draft: DraftEntity,
  count = 20,
  pickNumber?: number
): Promise<DraftSelectionEntity[]> => {
  const draftSelections: DraftSelectionEntity[] = [];
  for (let i = 0; i < count; i++) {
    const draftSelection = repository.create();
    draftSelection.roundNumber = 1;
    draftSelection.pickNumber = pickNumber || i + 1;
    draftSelection.challengeParticipant = Promise.resolve(participant);
    draftSelection.draft = Promise.resolve(draft);
    draftSelections.push(draftSelection);
  }
  return repository.save(draftSelections);
};

export const seedDraftSelection = async (
  repository: Repository<DraftSelectionEntity>,
  participant: ChallengeParticipantEntity,
  draft: DraftEntity,
  pickNumber?: number
): Promise<DraftSelectionEntity> => {
  const [draftSelection] = await seedDraftSelections(
    repository,
    participant,
    draft,
    1,
    pickNumber
  );
  return draftSelection;
};
