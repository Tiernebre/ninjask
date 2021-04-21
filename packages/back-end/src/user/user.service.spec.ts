import { Repository } from 'typeorm'
import { PasswordEncoder } from '../crypto/password-encoder'
import { UserService } from './user.service'
import { object, when } from 'testdouble'
import { UserEntity } from './user.entity'
import { generateMockUserEntity } from './user.mock'

describe('UserService', () => {
  let userService: UserService
  let passwordEncoder: PasswordEncoder
  let userRepository: Repository<UserEntity>

  beforeEach(() => {
    passwordEncoder = object<PasswordEncoder>()
    userRepository = object<Repository<UserEntity>>()
    userService = new UserService(
      passwordEncoder,
      userRepository
    )
  })

  describe('findOneWithAccessKeyAndPassword', () => {
    it('returns a user if one exists with a given access key', async () => {
      const userEntity = generateMockUserEntity()
      when(userRepository.findOne({ accessKey: userEntity.accessKey })).thenResolve(userEntity)
      const gottenUser = await userService.findOneWithAccessKeyAndPassword(userEntity.accessKey, userEntity.password)
      expect(gottenUser.isPresent()).toEqual(true)
      gottenUser.ifPresent((gottenUser) => {
        expect(gottenUser.id).toEqual(userEntity.id)
        expect(gottenUser.accessKey).toEqual(userEntity.accessKey)
      })
    })

    it('returns an empty optional if a user with a given access key does not exist.', async () => {
      const userEntity = generateMockUserEntity()
      when(userRepository.findOne({ accessKey: userEntity.accessKey })).thenResolve(undefined)
      const gottenUser = await userService.findOneWithAccessKeyAndPassword(userEntity.accessKey, userEntity.password)
      expect(gottenUser.isPresent()).toEqual(false)
    })
  })
})
