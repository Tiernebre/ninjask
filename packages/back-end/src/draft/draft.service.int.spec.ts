import { Repository, getRepository } from "typeorm";
import { ChallengeEntity } from "../challenge/challenge.entity";
import { seedChallenges } from "../challenge/challenge.seed";
import { establishDbConnection } from "../test/create-db-connection";
import { DraftEntity } from "./draft.entity";
import { seedDraftPokemon, seedDrafts } from "./draft.seed";
import { DraftService } from "./draft.service";
import { object } from "testdouble";
import { Logger } from "../logger";
import { DraftPokemonEntity } from "./draft-pokemon.entity";

describe("DraftService (integration)", () => {
  let draftService: DraftService;
  let challengeRepository: Repository<ChallengeEntity>;
  let draftRepository: Repository<DraftEntity>;

  beforeAll(async () => {
    await establishDbConnection();
    challengeRepository = getRepository(ChallengeEntity);
    draftRepository = getRepository(DraftEntity);
    await seedChallenges(challengeRepository);
    await seedDrafts(draftRepository);
  });

  beforeEach(() => {
    draftService = new DraftService(draftRepository, object<Logger>());
  });

  describe("getOneForChallengeId", () => {
    it("returns the draft that is associated with a given challenge id", async () => {
      let draft = (await draftRepository.findOne(1)) as DraftEntity;
      const challenge = (await challengeRepository.findOne(
        1
      )) as ChallengeEntity;
      draft.challenge = Promise.resolve(challenge);
      const associatedPokemon = await seedDraftPokemon(
        getRepository(DraftPokemonEntity),
        draft,
        5
      );
      draft.pokemon = Promise.resolve(associatedPokemon);
      draft = await draftRepository.save(draft);
      const draftGotten = await draftService.getOneForChallengeId(challenge.id);
      expect(draftGotten.id).toEqual(draft.id);
      expect(draftGotten.extraPoolSize).toEqual(draft.extraPoolSize);
      expect(draftGotten.livePoolingHasFinished).toEqual(false);
    });

    it("returns that the draft has finished live pooling if it did", async () => {
      let draft = (await draftRepository.findOne(2)) as DraftEntity;
      const challenge = (await challengeRepository.findOne(
        2
      )) as ChallengeEntity;
      draft.challenge = Promise.resolve(challenge);
      draft.livePoolPokemonIndex = draft.extraPoolSize - 1;
      const associatedPokemon = await seedDraftPokemon(
        getRepository(DraftPokemonEntity),
        draft,
        2
      );
      draft.pokemon = Promise.resolve(associatedPokemon);
      draft.livePoolPokemonIndex = associatedPokemon.length - 1;
      draft = await draftRepository.save(draft);
      const draftGotten = await draftService.getOneForChallengeId(challenge.id);
      expect(draftGotten.livePoolingHasFinished).toEqual(true);
    });

    it("throws an error if the challenge id provided is not associated with a draft", async () => {
      await expect(
        draftService.getOneForChallengeId(Number.MAX_SAFE_INTEGER)
      ).rejects.toThrowError();
    });
  });
});
