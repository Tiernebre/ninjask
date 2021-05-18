import { Repository } from 'typeorm';
import { ChallengeResultEntity } from './challenge-result.entity';
import { ChallengeResultService } from './challenge-result.service';
import { object, when } from 'testdouble';
import { generateRandomNumber } from '../random';
import { generateMockChallengeResultEntity } from './challenge.mock';

describe('ChallengeResultService', () => {
  let challengeResultService: ChallengeResultService
  let challengeResultRepository: Repository<ChallengeResultEntity>

  beforeEach(() => {
    challengeResultRepository = object<Repository<ChallengeResultEntity>>()
    challengeResultService = new ChallengeResultService(challengeResultRepository)
  })

  describe("createOne", () => {
    it("returns the created challenge result", async () => {
      const userId = generateRandomNumber()
      const challengeId = generateRandomNumber()
      const challengeResultEntity = generateMockChallengeResultEntity()
      challengeResultEntity.userId = userId
      challengeResultEntity.challengeId = challengeId
      when(challengeResultRepository.create({ userId, challengeId })).thenResolve(challengeResultEntity)
      when(challengeResultRepository.save(challengeResultEntity)).thenResolve(challengeResultEntity)
      const createdUser = await challengeResultService.createOne(userId, challengeId)
      expect(createdUser.id).toEqual(challengeResultEntity.id)
      expect(createdUser.userId).toEqual(challengeResultEntity.userId)
      expect(createdUser.challengeId).toEqual(challengeResultEntity.challengeId)
    })
  })
})