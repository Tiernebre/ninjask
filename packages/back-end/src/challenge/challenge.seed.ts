import { Repository } from "typeorm"
import { generateRandomString } from "../random"
import { ChallengeEntity } from "./challenge.entity"

export const seedChallenges = async (repository: Repository<ChallengeEntity>, count = 20): Promise<ChallengeEntity[]> => {
  const challenges = []
  for (let i = 0; i < count; i++) {
    const challenge = repository.create()
    challenge.name = generateRandomString()
    challenge.description = generateRandomString()
    challenge.versionId = i
    challenges.push(challenge)
  }
  return repository.save(challenges)
}