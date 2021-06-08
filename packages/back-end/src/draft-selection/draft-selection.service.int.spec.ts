import { Repository, getRepository } from "typeorm";
import { DraftSelectionService } from ".";
import { ChallengeParticipantEntity } from "../challenge-participant";
import { ChallengeEntity } from "../challenge/challenge.entity";
import {
  seedChallenge,
  seedChallengeParticipants,
} from "../challenge/challenge.seed";
import { DraftEntity } from "../draft/draft.entity";
import { seedDraft } from "../draft/draft.seed";
import { establishDbConnection } from "../test/create-db-connection";
import { UserEntity } from "../user/user.entity";
import { seedUser } from "../user/user.seed";
import { DraftSelectionEntity } from "./draft-selection.entity";
import { seedDraftSelection } from "./draft-selection.seed";

describe("DraftSelectionService (integration)", () => {
  let draftSelectionService: DraftSelectionService;

  let challengeParticipantRepository: Repository<ChallengeParticipantEntity>;
  let challengeRepository: Repository<ChallengeEntity>;
  let userRepository: Repository<UserEntity>;
  let draftRepository: Repository<DraftEntity>;

  let challenge: ChallengeEntity;
  let user: UserEntity;
  let challengeParticipants: ChallengeParticipantEntity[];
  let draft: DraftEntity;
  const createdSelections: DraftSelectionEntity[] = [];

  beforeAll(async () => {
    await establishDbConnection();
    challengeRepository = getRepository(ChallengeEntity);
    draftRepository = getRepository(DraftEntity);
    userRepository = getRepository(UserEntity);
    challengeParticipantRepository = getRepository(ChallengeParticipantEntity);

    challenge = await seedChallenge(challengeRepository);
    user = await seedUser(userRepository);
    draft = await seedDraft(draftRepository, challenge);
    challengeParticipants = await seedChallengeParticipants(
      challengeParticipantRepository,
      [challenge],
      user
    );

    const draftSelectionRepository = getRepository(DraftSelectionEntity);
    for (const challengeParticipant of challengeParticipants) {
      const createdSelection = await seedDraftSelection(
        draftSelectionRepository,
        challengeParticipant
      );
      createdSelections.push(createdSelection);
    }
    draftSelectionService = new DraftSelectionService(draftSelectionRepository);
  });

  describe("getAllForDraft", () => {
    it("returns properly mapped draft selections from a given draft", async () => {
      expect(createdSelections.length).toBeGreaterThan(0);
      const gottenSelections = await draftSelectionService.getAllForDraft(
        draft.id
      );
      expect(gottenSelections).toHaveLength(createdSelections.length);
    });
  });
});
