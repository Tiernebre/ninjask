import { Repository } from "typeorm";
import { generateRandomString } from "../random";
import { UserEntity } from "./user.entity";
import { v4 as uuidv4 } from "uuid";

export const seedUsers = async (
  repository: Repository<UserEntity>,
  count = 20
): Promise<UserEntity[]> => {
  const users = [];
  for (let i = 0; i < count; i++) {
    const user = repository.create();
    user.nickname = generateRandomString();
    user.password = generateRandomString();
    user.accessKey = uuidv4();
    users.push(user);
  }
  return repository.save(users);
};

export const seedUser = async (
  repository: Repository<UserEntity>
): Promise<UserEntity> => {
  const [user] = await seedUsers(repository, 1);
  return user;
};
