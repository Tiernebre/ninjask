import { Repository, getRepository, getCustomRepository } from "typeorm";
import { DraftSelectionRepository } from "./draft-selection.repository";
import { ChallengeParticipantEntity } from "../challenge-participant";
import { ChallengeEntity } from "../challenge/challenge.entity";
import {
  seedChallenge,
  seedChallengeParticipant,
} from "../challenge/challenge.seed";
import { DraftEntity } from "../draft/draft.entity";
import { seedDraft, seedDraftPokemon } from "../draft/draft.seed";
import { establishDbConnection } from "../test/create-db-connection";
import { UserEntity } from "../user/user.entity";
import { seedUsers } from "../user/user.seed";
import { DraftSelectionEntity } from "./draft-selection.entity";
import {
  clearAllDraftSelections,
  seedDraftSelection,
} from "./draft-selection.seed";
import { last, orderBy } from "lodash";
import { DraftPokemonEntity } from "../draft/draft-pokemon.entity";

describe("DraftSelectionRepository", () => {
  let draftSelectionRepository: DraftSelectionRepository;

  let challengeParticipantRepository: Repository<ChallengeParticipantEntity>;
  let challengeRepository: Repository<ChallengeEntity>;
  let userRepository: Repository<UserEntity>;
  let draftRepository: Repository<DraftEntity>;

  let challenge: ChallengeEntity;
  let users: UserEntity[];
  const challengeParticipants: ChallengeParticipantEntity[] = [];
  let draft: DraftEntity;
  let createdSelections: DraftSelectionEntity[] = [];

  beforeAll(async () => {
    await establishDbConnection();
  });

  beforeEach(async () => {
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

    draftSelectionRepository = getCustomRepository(DraftSelectionRepository);
    createdSelections = [];

    for (const challengeParticipant of challengeParticipants) {
      const createdSelection = await seedDraftSelection(
        draftSelectionRepository,
        challengeParticipant,
        draft,
        createdSelections.length + 1
      );
      createdSelections.push(createdSelection);
    }
  });

  afterEach(async () => {
    await clearAllDraftSelections();
  });

  describe("getAllForDraftId", () => {
    it("returns properly mapped draft selections from a given draft", async () => {
      expect(createdSelections.length).toBeGreaterThan(0);
      const gottenSelections = await draftSelectionRepository.getAllForDraftId(
        draft.id
      );
      const expectedSelections = orderBy(
        createdSelections,
        ["roundNumber", "pickNumber"],
        ["asc", "asc"]
      );
      expect(gottenSelections).toHaveLength(expectedSelections.length);
      for (let i = 0; i < expectedSelections.length; i++) {
        const createdSelection = expectedSelections[i];
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
        expect(user.id).toBeTruthy();
        expect(user.nickname).toBeTruthy();
        expect(correspondingSelection.userNickname).toEqual(user.nickname);
        expect(correspondingSelection.userId).toEqual(user.id);
      }
    });

    it("returns an empty array if the draft does not have any selections", async () => {
      const newDraft = await seedDraft(draftRepository);
      const gottenSelections = await draftSelectionRepository.getAllForDraftId(
        newDraft.id
      );
      expect(gottenSelections).toBeTruthy();
      expect(gottenSelections).toHaveLength(0);
    });
  });

  describe("getOneByIdAndUserId", () => {
    it("returns an entity if one exists with a given id and user ID", async () => {
      const [draftSelection] = createdSelections;
      const participant = await draftSelection.challengeParticipant;
      const user = await participant.user;
      const gottenDraftSelection =
        await draftSelectionRepository.getOneWithIdAndUserId(
          draftSelection.id,
          user.id
        );
      expect(gottenDraftSelection).toBeTruthy();
      expect(gottenDraftSelection?.id).toEqual(draftSelection.id);
      expect(gottenDraftSelection?.pickNumber).toEqual(
        draftSelection.pickNumber
      );
      expect(gottenDraftSelection?.roundNumber).toEqual(
        draftSelection.roundNumber
      );
    });

    it("returns undefined if given a bogus id", async () => {
      const [user] = users;
      const gottenDraftSelection =
        await draftSelectionRepository.getOneWithIdAndUserId(100000, user.id);
      expect(gottenDraftSelection).toBeUndefined();
    });

    it("returns undefined if given a bogus user id", async () => {
      const [draftSelection] = createdSelections;
      const gottenDraftSelection =
        await draftSelectionRepository.getOneWithIdAndUserId(
          draftSelection.id,
          1000000
        );
      expect(gottenDraftSelection).toBeUndefined();
    });
  });

  describe("getPendingSelectionsBeforeSelection", () => {
    let newChallenge: ChallengeEntity;
    let newDraft: DraftEntity;
    let newChallengeParticipants: ChallengeParticipantEntity[] = [];

    beforeEach(async () => {
      newChallengeParticipants = [];
      newChallenge = await seedChallenge(challengeRepository);
      newDraft = await seedDraft(draftRepository, newChallenge);
      for (const user of users) {
        const challengeParticipant = await seedChallengeParticipant(
          challengeParticipantRepository,
          newChallenge,
          user
        );
        newChallengeParticipants.push(challengeParticipant);
      }
    });

    it("returns an empty array if every selection before the provided one has been made", async () => {
      const draftPokemon = await seedDraftPokemon(
        getRepository(DraftPokemonEntity),
        newDraft,
        newChallengeParticipants.length
      );
      const selections: DraftSelectionEntity[] = [];
      let pickNumber = 1;
      for (const participant of newChallengeParticipants) {
        const draftSelection = draftSelectionRepository.create();
        draftSelection.roundNumber = 1;
        draftSelection.pickNumber = pickNumber;
        draftSelection.challengeParticipant = Promise.resolve(participant);
        draftSelection.pokemonId = draftPokemon[pickNumber - 1].id;
        draftSelection.draft = Promise.resolve(newDraft);
        selections.push(await draftSelectionRepository.save(draftSelection));
        pickNumber++;
      }
      const selectionToTest = last(selections) as DraftSelectionEntity;
      const pendingSelections =
        await draftSelectionRepository.getPendingSelectionsBeforeSelection(
          selectionToTest,
          newDraft.id
        );
      expect(pendingSelections).toBeTruthy();
      expect(pendingSelections).toHaveLength(0);
    });

    it("returns the previous selections if every selection before the provided one has not been made", async () => {
      const selections: DraftSelectionEntity[] = [];
      let pickNumber = 1;
      for (const participant of newChallengeParticipants) {
        const draftSelection = draftSelectionRepository.create();
        draftSelection.roundNumber = 1;
        draftSelection.pickNumber = pickNumber;
        draftSelection.challengeParticipant = Promise.resolve(participant);
        draftSelection.draft = Promise.resolve(newDraft);
        selections.push(await draftSelectionRepository.save(draftSelection));
        pickNumber++;
      }
      const selectionToTest = selections.pop() as DraftSelectionEntity;
      const pendingSelections =
        await draftSelectionRepository.getPendingSelectionsBeforeSelection(
          selectionToTest,
          newDraft.id
        );
      expect(pendingSelections).toBeTruthy();
      expect(pendingSelections).toHaveLength(selections.length);
    });
  });
});
