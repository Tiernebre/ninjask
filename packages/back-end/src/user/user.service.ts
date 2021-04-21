import { Repository } from "typeorm";
import { PasswordEncoder } from "../crypto/password-encoder";
import { CreateUserRequest } from "./create-user-request";
import { User } from "./user";
import { UserEntity } from "./user.entity";
import { v4 as uuidv4 } from 'uuid';

export class UserService {
  constructor(
    private readonly passwordEncoder: PasswordEncoder,
    private readonly userRepository: Repository<UserEntity>
  ) {}

  public async createOne(
    request: CreateUserRequest
  ): Promise<User> {
    const userEntity = this.userRepository.create()
    userEntity.nickname = request.nickname
    userEntity.password = await this.passwordEncoder.encode(request.password)
    userEntity.accessKey = uuidv4()
    const savedUserEntity = await this.userRepository.save(userEntity)
    return this.mapEntityToDto(savedUserEntity)
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

  private mapEntityToDto(entity: UserEntity): User {
    return new User(entity.id, entity.accessKey);
  }

  private verifyPassword(
    givenPassword: string,
    existingUser: UserEntity
  ): Promise<boolean> {
    return this.passwordEncoder.matches(givenPassword, existingUser.password);
  }
}
