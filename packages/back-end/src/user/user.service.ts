import { Repository } from "typeorm";
import { PasswordEncoder } from "../crypto/password-encoder";
import { User } from "./user";
import { UserEntity } from "./user.entity";

export class UserService {
  constructor(
    private readonly passwordEncoder: PasswordEncoder,
    private readonly userRepository: Repository<UserEntity>
  ) {}

  public async findOneWithAccessKeyAndPassword(
    accessKey: string,
    password: string
  ): Promise<User> {
    const foundUser = await this.userRepository.findOne({ accessKey })
    if (!foundUser) {
      throw new Error(`User with access key = ${accessKey} does not exist.`)
    }

    const passwordIsValid = await this.verifyPassword(password, foundUser)
    if (!passwordIsValid) {
      throw new Error(`User with access key = ${accessKey} had an incorrect password attempt.`)
    }
    return this.mapEntityToDto(foundUser)
  }

  private mapEntityToDto(entity: UserEntity): User {
    return new User(
      entity.id,
      entity.accessKey
    )
  }

  private verifyPassword(givenPassword: string, existingUser: UserEntity): Promise<boolean> {
    return this.passwordEncoder.matches(givenPassword, existingUser.password)
  }
}
