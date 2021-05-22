import { Repository } from "typeorm";
import { PasswordEncoder } from "../crypto/password-encoder";
import {
  CreateUserRequest,
  createUserRequestSchema,
} from "./create-user-request";
import { User } from "./user";
import { UserEntity } from "./user.entity";

export class UserService {
  constructor(
    private readonly passwordEncoder: PasswordEncoder,
    private readonly userRepository: Repository<UserEntity>
  ) {}

  public async createOne(request: CreateUserRequest): Promise<User> {
    createUserRequestSchema.parse(request);
    const userEntity = this.userRepository.create();
    userEntity.nickname = request.nickname;
    userEntity.password = await this.passwordEncoder.encode(request.password);
    const savedUserEntity = await this.userRepository.save(userEntity);
    const reloadedUser = (await this.userRepository.findOne(
      savedUserEntity.id
    )) as UserEntity;
    return this.mapEntityToDto(reloadedUser);
  }

  public async findOneWithId(id: number): Promise<User> {
    const foundUser = await this.userRepository.findOne(id);
    if (!foundUser) {
      throw new Error(`User with id = ${id} does not exist.`);
    }
    return this.mapEntityToDto(foundUser);
  }

  public async findOneWithAccessKeyAndPassword(
    accessKey: string,
    password: string
  ): Promise<User> {
    const foundUser = await this.userRepository.findOne({ accessKey });
    if (!foundUser) {
      throw new Error(`User with access key = ${accessKey} does not exist.`);
    }

    const passwordIsValid = await this.verifyPassword(password, foundUser);
    if (!passwordIsValid) {
      throw new Error(
        `User with access key = ${accessKey} had an incorrect password attempt.`
      );
    }
    return this.mapEntityToDto(foundUser);
  }

  public async incrementTokenVersionForOneWithId(id: number): Promise<User> {
    await this.userRepository.increment({ id }, "tokenVersion", 1);
    return this.findOneWithId(id);
  }

  private mapEntityToDto(entity: UserEntity): User {
    return new User(entity.id, entity.accessKey, entity.tokenVersion);
  }

  private verifyPassword(
    givenPassword: string,
    existingUser: UserEntity
  ): Promise<boolean> {
    return this.passwordEncoder.matches(givenPassword, existingUser.password);
  }
}
