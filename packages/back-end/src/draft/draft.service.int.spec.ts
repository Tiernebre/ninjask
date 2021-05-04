import { Repository, getRepository } from "typeorm";
import { ChallengeEntity } from "../challenge/challenge.entity";
import { seedChallenges } from "../challenge/challenge.seed";
import { establishDbConnection } from "../test/create-db-connection";
import { DraftEntity } from "./draft.entity";
import { seedDrafts } from "./draft.seed";
import { DraftService } from "./draft.service";
import { object } from 'testdouble';
import { VersionService } from "../version/version.service";
import { PokemonService } from "../pokemon/pokemon.service";
import { Logger } from "../logger";

describe('DraftService (integration)', () => {
  let draftService: DraftService;
  let challengeRepository: Repository<ChallengeEntity>;
  let draftRepository: Repository<DraftEntity>;


  beforeAll(async () => {
    await establishDbConnection();
    challengeRepository = getRepository(ChallengeEntity);
    draftRepository = getRepository(DraftEntity);
    await seedChallenges(challengeRepository);
    const results = await seedDrafts(draftRepository);
    console.log('results = ', results)
  });

  beforeEach(() => {
    draftService = new DraftService(
      draftRepository, 
      object<VersionService>(),
      object<PokemonService>(),
      object<Logger>()
    )
  });

  describe("getOneForChallengeId", () => {
    it("returns the draft that is associated with a given challenge id", async () => {
      const result = await seedDrafts(draftRepository, 1)
      console.log('result = ', result)
      let draft = await draftRepository.findOne() as DraftEntity
      const challenge = await challengeRepository.findOne() as ChallengeEntity
      draft.challenge = Promise.resolve(challenge)
      draft = await draftRepository.save(draft)
      const draftGotten = await draftService.getOneForChallengeId(challenge.id)
      expect(draftGotten.id).toEqual(draft.id)
      expect(draftGotten.poolSize).toEqual(draft.poolSize)
    });

    it("throws an error if the challenge id provided is not associated with a draft", async () => {
      await expect(draftService.getOneForChallengeId(Number.MAX_SAFE_INTEGER)).rejects.toThrowError()
    });
  });
})
