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
import { first, last, orderBy } from "lodash";
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

  describe("getPendingOneByIdAndUserId", () => {
    it("returns an entity if one exists with a given id and user ID", async () => {
      const [draftSelection] = createdSelections;
      const participant = await draftSelection.challengeParticipant;
      const user = await participant.user;
      const gottenDraftSelection =
        await draftSelectionRepository.getPendingOneWithIdAndUserId(
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
        await draftSelectionRepository.getPendingOneWithIdAndUserId(
          100000,
          user.id
        );
      expect(gottenDraftSelection).toBeUndefined();
    });

    it("returns undefined if given a bogus user id", async () => {
      const [draftSelection] = createdSelections;
      const gottenDraftSelection =
        await draftSelectionRepository.getPendingOneWithIdAndUserId(
          draftSelection.id,
          1000000
        );
      expect(gottenDraftSelection).toBeUndefined();
    });

    it("returns undefined if the pick has already been finalized", async () => {
      let [draftSelection] = createdSelections;
      const [draftPokemon] = await seedDraftPokemon(
        getRepository(DraftPokemonEntity),
        draft,
        1
      );
      draftSelection.pokemonId = draftPokemon.id;
      draftSelection = await draftSelectionRepository.save(draftSelection);
      const participant = await draftSelection.challengeParticipant;
      const user = await participant.user;
      const gottenDraftSelection =
        await draftSelectionRepository.getPendingOneWithIdAndUserId(
          draftSelection.id,
          user.id
        );
      expect(gottenDraftSelection).toBeUndefined();
    });
  });

  describe("getNumberOfPendingSelectionsBeforeSelection", () => {
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

    it("returns 0 if the provided selection is the first pick", async () => {
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
      const selectionToTest = first(selections) as DraftSelectionEntity;
      const numberOfPendingSelections =
        await draftSelectionRepository.getNumberOfPendingSelectionsBeforeSelection(
          selectionToTest
        );
      expect(numberOfPendingSelections).toEqual(0);
    });

    it("returns 1 if the provided selection is the second pick and the first has not been chosen yet.", async () => {
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
      const selectionToTest = selections[1];
      const numberOfPendingSelections =
        await draftSelectionRepository.getNumberOfPendingSelectionsBeforeSelection(
          selectionToTest
        );
      expect(numberOfPendingSelections).toEqual(1);
    });

    it("returns 0 if every selection before the provided one has been made (last case)", async () => {
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
      const numberOfPendingSelections =
        await draftSelectionRepository.getNumberOfPendingSelectionsBeforeSelection(
          selectionToTest
        );
      expect(numberOfPendingSelections).toEqual(0);
    });

    it("returns 0 if every selection before the provided one has been made (middle case)", async () => {
      const draftPokemon = await seedDraftPokemon(
        getRepository(DraftPokemonEntity),
        newDraft,
        newChallengeParticipants.length
      );
      const selections: DraftSelectionEntity[] = [];
      let pickNumber = 1;
      let i = 0;
      const middleIndex = newChallengeParticipants.length / 2;
      for (const participant of newChallengeParticipants) {
        const draftSelection = draftSelectionRepository.create();
        draftSelection.roundNumber = 1;
        draftSelection.pickNumber = pickNumber;
        draftSelection.challengeParticipant = Promise.resolve(participant);
        draftSelection.draft = Promise.resolve(newDraft);
        if (i < middleIndex) {
          draftSelection.pokemonId = draftPokemon[pickNumber - 1].id;
        }
        selections.push(await draftSelectionRepository.save(draftSelection));
        pickNumber++;
        i++;
      }
      const selectionToTest = selections[middleIndex];
      const numberOfPendingSelections =
        await draftSelectionRepository.getNumberOfPendingSelectionsBeforeSelection(
          selectionToTest
        );
      expect(numberOfPendingSelections).toEqual(0);
    });

    it("returns the length of previous selections if every selection before the provided one that has not been made (last case)", async () => {
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
      const numberOfPendingSelections =
        await draftSelectionRepository.getNumberOfPendingSelectionsBeforeSelection(
          selectionToTest
        );
      expect(numberOfPendingSelections).toEqual(selections.length);
    });

    it("returns the length of previous selections if every selection before the provided one that has not been made (middle case)", async () => {
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
      const middleIndex = selections.length / 2;
      const selectionToTest = selections[middleIndex];
      const numberOfPendingSelections =
        await draftSelectionRepository.getNumberOfPendingSelectionsBeforeSelection(
          selectionToTest
        );
      expect(numberOfPendingSelections).toEqual(selections.length / 2);
    });
  });

  describe("oneExistsWithPokemonId", () => {
    it('returns true if a draft selection exists with a provided pokemon id', async () => {
      const [draftPokemon] = await seedDraftPokemon(
        getRepository(DraftPokemonEntity),
        draft,
        1
      );
      const draftSelection = draftSelectionRepository.create();
      draftSelection.roundNumber = 6;
      draftSelection.pickNumber = 100;
      draftSelection.challengeParticipant = Promise.resolve(challengeParticipants[0]);
      draftSelection.draft = Promise.resolve(draft);
      draftSelection.pokemonId = draftPokemon.id
      await draftSelectionRepository.save(draftSelection)
      await expect(draftSelectionRepository.oneExistsWithPokemonId(draftPokemon.id)).resolves.toEqual(true)
    })

    it('returns false if a draft selection does not exist with a provided pokemon id', async () => {
      const [draftPokemon] = await seedDraftPokemon(
        getRepository(DraftPokemonEntity),
        draft,
        1
      );
      await expect(draftSelectionRepository.oneExistsWithPokemonId(draftPokemon.id)).resolves.toEqual(false)
    })
  })
});
