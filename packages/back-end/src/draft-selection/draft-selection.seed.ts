import { getRepository, Repository } from "typeorm";
import { ChallengeParticipantEntity } from "../challenge-participant";
import { getRandomInt } from "../random";
import { DraftSelectionEntity } from "./draft-selection.entity";

export const clearAllDraftSelections = async (): Promise<void> => {
  await getRepository(DraftSelectionEntity)
    .createQueryBuilder()
    .delete()
    .execute();
};

export const seedDraftSelections = async (
  repository: Repository<DraftSelectionEntity>,
  participant: ChallengeParticipantEntity,
  count = 20
): Promise<DraftSelectionEntity[]> => {
  const draftSelections: DraftSelectionEntity[] = [];
  for (let i = 0; i < count; i++) {
    const draftSelection = repository.create();
    draftSelection.roundNumber = getRandomInt(1, 7);
    draftSelection.pickNumber = getRandomInt(1, 5);
    draftSelection.challengeParticipant = Promise.resolve(participant);
    draftSelections.push(draftSelection);
  }
  return repository.save(draftSelections);
};

export const seedDraftSelection = async (
  repository: Repository<DraftSelectionEntity>,
  participant: ChallengeParticipantEntity
): Promise<DraftSelectionEntity> => {
  const [draftSelection] = await seedDraftSelections(
    repository,
    participant,
    1
  );
  return draftSelection;
};
