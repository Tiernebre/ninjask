import { object, when } from 'testdouble'
import { Repository } from 'typeorm'
import { ChallengeEntity } from './challenge.entity'
import { generateMockChallenge } from './challenge.mock'
import { ChallengeService } from './challenge.service'


describe("ChallengeService", () => {
  let challengeRepository: Repository<ChallengeEntity>
  let challengeService: ChallengeService

  beforeEach(() => {
    challengeRepository = object<Repository<ChallengeEntity>>()
    challengeService = new ChallengeService(challengeRepository)
  })

  describe('getOneById', () => {
    it("returns the challenge if it exists", async () => {
      const challenge = generateMockChallenge()
      when(challengeRepository.findOne(challenge.id)).thenResolve(challenge)
      const gottenChallenge = await challengeService.getOneById(challenge.id)
      expect(gottenChallenge.id).toEqual(challenge.id)
      expect(gottenChallenge.name).toEqual(challenge.name)
      expect(gottenChallenge.description).toEqual(challenge.description)
      expect(gottenChallenge.versionId).toEqual(challenge.versionId)
      expect(gottenChallenge.creatorId).toEqual(challenge.creatorId)
    })

    it("throws an error if the challenge does not exist", async () => {
      const id = 1
      when(challengeRepository.findOne(id)).thenResolve(undefined)
      await expect(challengeService.getOneById(id)).rejects.toThrowError()
    })
  })
})