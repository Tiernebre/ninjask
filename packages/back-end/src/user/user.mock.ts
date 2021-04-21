import { UserEntity } from "./user.entity"
import { generateRandomNumber, generateRandomString } from '../random'

export const generateMockUserEntity = (): UserEntity => {
  const userEntity = new UserEntity()
  userEntity.id = generateRandomNumber()
  userEntity.accessKey = generateRandomString()
  userEntity.nickname = generateRandomString()
  userEntity.password = generateRandomString()
  userEntity.createdAt = new Date()
  userEntity.updatedAt = new Date()
  return userEntity;
}