import { Repository } from "typeorm";
import { ChallengeParticipantEntity } from "../challenge-participant";
import { getRandomInt } from "../random";
import { DraftSelectionEntity } from "./draft-selection.entity";

export const seedDraftSelections = async (
  repository: Repository<DraftSelectionEntity>,
  participant: ChallengeParticipantEntity,
  count = 20
): Promise<DraftSelectionEntity[]> => {
  const draftSelections: DraftSelectionEntity[] = [];
  for (let i = 0; i < count; i++) {
    const draftSelection = repository.create();
    draftSelection.roundNumber = getRandomInt(0, 7);
    draftSelection.pickNumber = getRandomInt(0, 33);
    draftSelection.challengeParticipant = Promise.resolve(participant);
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
