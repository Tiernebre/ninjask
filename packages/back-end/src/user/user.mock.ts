import { UserEntity } from "./user.entity";
import { generateRandomNumber, generateRandomString } from "../random";
import { User } from "./user";

export const generateMockUserEntity = (): UserEntity => {
  const userEntity = new UserEntity();
  userEntity.id = generateRandomNumber();
  userEntity.accessKey = generateRandomString();
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
