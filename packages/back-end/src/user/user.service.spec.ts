import { Repository } from "typeorm";
import { PasswordEncoder } from "../crypto/password-encoder";
import { UserService } from "./user.service";
import { object, when, verify } from "testdouble";
import { UserEntity } from "./user.entity";
import { generateMockUser, generateMockUserEntity } from "./user.mock";
import { generateRandomNumber, generateRandomString } from "../random";
import { z } from "zod";

describe("UserService", () => {
  let userService: UserService;
  let passwordEncoder: PasswordEncoder;
  let userRepository: Repository<UserEntity>;

  beforeEach(() => {
    passwordEncoder = object<PasswordEncoder>();
    userRepository = object<Repository<UserEntity>>();
    userService = new UserService(passwordEncoder, userRepository);
  });

  describe("createOne", () => {
    it("returns a created user", async () => {
      const request = {
        nickname: generateRandomString(),
        password: generateRandomString(),
      };
      const hashedPassword = generateRandomString();
      when(passwordEncoder.encode(request.password)).thenResolve(
        hashedPassword
      );
      const userEntity = generateMockUserEntity();
      when(userRepository.create()).thenReturn(userEntity);
      when(userRepository.save(userEntity)).thenResolve(userEntity);
      when(userRepository.findOne(userEntity.id)).thenResolve(userEntity);
      const createdUser = await userService.createOne(request);
      expect(createdUser.id).toEqual(userEntity.id);
      expect(createdUser.accessKey).toBeTruthy();
      expect(userEntity.nickname).toEqual(request.nickname);
      expect(userEntity.password).toEqual(hashedPassword);
    });

    it.each([undefined, null, ""])(
      "throws an error if the create user request username is %p",
      async (nickname?: string | null) => {
        const request = {
          nickname,
          password: generateRandomString(),
        };
        await expect(userService.createOne(request)).rejects.toThrowError(
          z.ZodError
        );
      }
    );

    it.each([undefined, null, ""])(
      "throws an error if the create user request password is %p",
      async (password?: string | null) => {
        const request = {
          nickname: generateRandomString(),
          password,
        };
        await expect(userService.createOne(request)).rejects.toThrowError(
          z.ZodError
        );
      }
    );
  });

  describe("findOneWithAccessKeyAndPassword", () => {
    it("returns a user if one exists with a given access key and correct password", async () => {
      const userEntity = generateMockUserEntity();
      when(
        userRepository.findOne({ accessKey: userEntity.accessKey })
      ).thenResolve(userEntity);
      const rawPassword = generateRandomString();
      when(
        passwordEncoder.matches(rawPassword, userEntity.password)
      ).thenResolve(true);
      const gottenUser = await userService.findOneWithAccessKeyAndPassword(
        userEntity.accessKey,
        rawPassword
      );
      expect(gottenUser.id).toEqual(userEntity.id);
      expect(gottenUser.accessKey).toEqual(userEntity.accessKey);
    });

    it("throws an error if a user without a given access key exists", async () => {
      const accessKey = generateRandomString();
      when(userRepository.findOne({ accessKey })).thenResolve(undefined);
      await expect(
        userService.findOneWithAccessKeyAndPassword(
          accessKey,
          generateRandomString()
        )
      ).rejects.toThrowError();
    });

    it("returns an empty optional if a user with a given access key does exist -- but the given password is incorrect.", async () => {
      const userEntity = generateMockUserEntity();
      when(
        userRepository.findOne({ accessKey: userEntity.accessKey })
      ).thenResolve(userEntity);
      const rawPassword = generateRandomString();
      when(
        passwordEncoder.matches(rawPassword, userEntity.password)
      ).thenResolve(false);
      await expect(
        userService.findOneWithAccessKeyAndPassword(
          userEntity.accessKey,
          generateRandomString()
        )
      ).rejects.toThrowError();
    });
  });

  describe("findOneWithId", () => {
    it("returns a user if one exists with a given id", async () => {
      const userEntity = generateMockUserEntity();
      when(userRepository.findOne(userEntity.id)).thenResolve(userEntity);
      const gottenUser = await userService.findOneWithId(userEntity.id);
      expect(gottenUser.id).toEqual(userEntity.id);
      expect(gottenUser.accessKey).toEqual(userEntity.accessKey);
    });

    it("throws an error if a user with the id does not exist", async () => {
      const id = generateRandomNumber();
      when(userRepository.findOne(id)).thenResolve(undefined);
      await expect(userService.findOneWithId(id)).rejects.toThrowError();
    });
  });

  describe("incrementTokenVersionForOneWithId", () => {
    it("increments the token version for a given id", async () => {
      const id = generateRandomNumber();
      const user = generateMockUser();
      when(userRepository.findOne(id)).thenResolve(user);
      const updatedUser = await userService.incrementTokenVersionForOneWithId(
        id
      );
      verify(userRepository.increment({ id }, "tokenVersion", 1));
      expect(updatedUser).toEqual(user);
    });
  });
});
