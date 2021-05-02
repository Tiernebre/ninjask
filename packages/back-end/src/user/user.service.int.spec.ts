import { getRepository, Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { establishDbConnection } from "../test/create-db-connection";
import { UserService } from './user.service';
import { object, when } from 'testdouble'
import { PasswordEncoder } from "../crypto/password-encoder";
import { CreateUserRequest } from "./create-user-request";
import { generateRandomNumber, generateRandomString } from "../random";

describe("UserService (integration)", () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;
  let passwordEncoder: PasswordEncoder

  beforeAll(async () => {
    await establishDbConnection();
    userRepository = getRepository(UserEntity)
  });

  beforeEach(() => {
    passwordEncoder = object<PasswordEncoder>()
    userService = new UserService(
      passwordEncoder,
      userRepository
    )
  });

  describe("createOne", () => {
    it('returns all auto generated columns on a user table', async () => {
      const createUserRequest: CreateUserRequest = {
        nickname: `Test User ${generateRandomNumber()}`,
        password: generateRandomString()
      }
      when(passwordEncoder.encode(createUserRequest.password)).thenResolve(createUserRequest.password)
      const createdUser = await userService.createOne(createUserRequest)
      expect(createdUser.accessKey).toBeTruthy()
      expect(createdUser.tokenVersion).toEqual(0)
    })
  })
})