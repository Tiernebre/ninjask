import { Repository, getRepository } from "typeorm";
import { ChallengeEntity } from "../challenge/challenge.entity";
import { seedChallenges } from "../challenge/challenge.seed";
import { establishDbConnection } from "../test/create-db-connection";
import { DraftEntity } from "./draft.entity";
import { seedDrafts } from "./draft.seed";
import { DraftService } from "./draft.service";
import { object } from "testdouble";
import { VersionService } from "../version/version.service";
import { PokemonService } from "../pokemon/pokemon.service";
import { Logger } from "../logger";

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
    draftService = new DraftService(
      draftRepository,
      object<VersionService>(),
      object<PokemonService>(),
      object<Logger>()
    );
  });

  describe("getOneForChallengeId", () => {
    it("returns the draft that is associated with a given challenge id", async () => {
      let draft = (await draftRepository.findOne(1)) as DraftEntity;
      const challenge = (await challengeRepository.findOne(
        1
      )) as ChallengeEntity;
      draft.challenge = Promise.resolve(challenge);
      draft = await draftRepository.save(draft);
      const draftGotten = await draftService.getOneForChallengeId(challenge.id);
      expect(draftGotten.id).toEqual(draft.id);
      expect(draftGotten.poolSize).toEqual(draft.poolSize);
      expect(draftGotten.livePoolingHasFinished).toEqual(false);
    });

    it("returns that draft has finished live pooling if it did", async () => {
      let draft = (await draftRepository.findOne(2)) as DraftEntity;
      const challenge = (await challengeRepository.findOne(
        2
      )) as ChallengeEntity;
      draft.challenge = Promise.resolve(challenge);
      draft.livePoolPokemonIndex = draft.poolSize - 1;
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
