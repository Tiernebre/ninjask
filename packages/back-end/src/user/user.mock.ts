import { UserEntity } from "./user.entity";
import { generateRandomNumber, generateRandomString } from "../random";
import { User } from "./user";
import { v4 as uuid } from 'uuid'

export const generateMockUserEntity = (): UserEntity => {
  const userEntity = new UserEntity();
  userEntity.id = generateRandomNumber();
  userEntity.accessKey = uuid();
  userEntity.nickname = generateRandomString();
  userEntity.password = generateRandomString();
  userEntity.createdAt = new Date();
  userEntity.updatedAt = new Date();
  return userEntity;
};

export const generateMockUser = (): User => {
  return new User(
    generateRandomNumber(),
    generateRandomString(),
    generateRandomNumber()
  );
};
