import { Repository, getRepository, getCustomRepository } from "typeorm";
import { DraftSelectionRepository } from "./draft-selection.repository";
import { ChallengeParticipantEntity } from "../challenge-participant";
import { ChallengeEntity } from "../challenge/challenge.entity";
import {
  seedChallenge,
  seedChallengeParticipant,
} from "../challenge/challenge.seed";
import { DraftEntity } from "../draft/draft.entity";
import { seedDraft } from "../draft/draft.seed";
import { establishDbConnection } from "../test/create-db-connection";
import { UserEntity } from "../user/user.entity";
import { seedUsers } from "../user/user.seed";
import { DraftSelectionEntity } from "./draft-selection.entity";
import { seedDraftSelection } from "./draft-selection.seed";

describe("DraftSelectionService (integration)", () => {
  let draftSelectionRepository: DraftSelectionRepository;

  let challengeParticipantRepository: Repository<ChallengeParticipantEntity>;
  let challengeRepository: Repository<ChallengeEntity>;
  let userRepository: Repository<UserEntity>;
  let draftRepository: Repository<DraftEntity>;

  let challenge: ChallengeEntity;
  let users: UserEntity[];
  const challengeParticipants: ChallengeParticipantEntity[] = [];
  let draft: DraftEntity;
  const createdSelections: DraftSelectionEntity[] = [];

  beforeAll(async () => {
    await establishDbConnection();
    challengeRepository = getRepository(ChallengeEntity);
    draftRepository = getRepository(DraftEntity);
    userRepository = getRepository(UserEntity);
    challengeParticipantRepository = getRepository(ChallengeParticipantEntity);

    challenge = await seedChallenge(challengeRepository);
    users = await seedUsers(userRepository);
    draft = await seedDraft(draftRepository, challenge);
    for (const user of users) {
      const challengeParticipant = await seedChallengeParticipant(
        challengeParticipantRepository,
        challenge,
        user
      );
      challengeParticipants.push(challengeParticipant);
    }

    const draftSelectionRepository = getRepository(DraftSelectionEntity);
    for (const challengeParticipant of challengeParticipants) {
      const createdSelection = await seedDraftSelection(
        draftSelectionRepository,
        challengeParticipant
      );
      createdSelections.push(createdSelection);
    }
  });

  beforeEach(() => {
    draftSelectionRepository = getCustomRepository(DraftSelectionRepository);
  });

  describe("getAllForDraftId", () => {
    it("returns properly mapped draft selections from a given draft", async () => {
      expect(createdSelections.length).toBeGreaterThan(0);
      const gottenSelections = await draftSelectionRepository.getAllForDraftId(
        draft.id
      );
      expect(gottenSelections).toHaveLength(createdSelections.length);
      for (let i = 0; i < createdSelections.length; i++) {
        const createdSelection = createdSelections[i];
        const correspondingSelection = gottenSelections[i];
        expect(correspondingSelection.id).toEqual(createdSelection.id);
        expect(createdSelection.roundNumber).toBeTruthy();
        expect(createdSelection.pickNumber).toBeTruthy();
        expect(correspondingSelection.round).toEqual(
          createdSelection.roundNumber
        );
        expect(correspondingSelection.pick).toEqual(
          createdSelection.pickNumber
        );
        const participant = await createdSelection.challengeParticipant;
        const user = await participant.user;
        expect(user.nickname).toBeTruthy();
        expect(correspondingSelection.userNickname).toEqual(user.nickname);
      }
    });
  });
});
