import { Secret } from 'jsonwebtoken'
import { UserService } from '../user/user.service'
import { JwtSessionService } from './jwt-session.service'
import { object, when } from 'testdouble'
import { generateRandomString } from '../random'
import { SessionRequest } from './session-request'
import { generateMockUser } from '../user/user.mock'
import jwt from 'jsonwebtoken'

describe('jwt-session', () => {
  let jwtSessionService: JwtSessionService
  let userService: UserService
  let secret: Secret

  beforeEach(() => {
    userService = object<UserService>()
    secret = generateRandomString()
    jwtSessionService = new JwtSessionService(
      userService,
      secret
    )
  })

  describe('createOne', () => {
    it('returns a session token bag if the request is valid', async () => {
      const request: SessionRequest = {
        accessKey: generateRandomString(),
        password: generateRandomString()
      }
      when(userService.findOneWithAccessKeyAndPassword(request.accessKey, request.password)).thenResolve(generateMockUser())
      const tokenBag = await jwtSessionService.createOne(request)
      expect(tokenBag.accessToken).toBeTruthy()
      expect(jwt.verify(tokenBag.accessToken, secret)).toBeTruthy()
    })
  })
})
