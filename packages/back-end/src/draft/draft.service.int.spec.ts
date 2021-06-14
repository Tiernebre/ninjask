import { Repository, getRepository } from "typeorm";
import { ChallengeEntity } from "../challenge/challenge.entity";
import { establishDbConnection } from "../test/create-db-connection";
import { DraftEntity } from "./draft.entity";
import { seedDraft, seedDraftPokemon } from "./draft.seed";
import { seedChallenge } from "../challenge/challenge.seed";
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
  });

  beforeEach(() => {
    draftService = new DraftService(draftRepository, object<Logger>());
  });

  describe("getOneForChallengeId", () => {
    it("returns the draft that is associated with a given challenge id", async () => {
      const challenge = await seedChallenge(challengeRepository);
      const draft = await seedDraft(draftRepository, challenge);
      const draftGotten = await draftService.getOneForChallengeId(challenge.id);
      expect(draftGotten.id).toEqual(draft.id);
    });

    it("returns that the draft has finished live pooling if it did", async () => {
      const challenge = await seedChallenge(challengeRepository);
      let draft = await seedDraft(draftRepository, challenge);
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
