import Optional from "optional-js";
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
  ): Promise<Optional<User>> {
    return Optional.ofNullable(await this.userRepository.findOne({ accessKey }))
          .map(entity => this.mapEntityToDto(entity))
  }

  private mapEntityToDto(entity: UserEntity): User {
    return new User(
      entity.id,
      entity.accessKey
    )
  }
}
