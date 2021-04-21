import { Secret } from 'jsonwebtoken'
import { UserService } from '../user/user.service'
import { JwtSessionService } from './jwt-session.service'
import { object, when } from 'testdouble'
import { generateRandomNumber, generateRandomString } from '../random'
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

  describe('constructor', () => {
    it.each([null, undefined, ''])('throws an error if secret provided is %p', (secret) => {
      expect(() => {
        new JwtSessionService(
          userService,
          secret as Secret
        )
      }).toThrowError()
    })
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

  describe('verifyOne', () => {
    it('returns the decoded payload if the given access token is valid', () => {
      const payload = {
        id: generateRandomNumber(),
        accessKey: generateRandomString()
      }
      const accessToken = jwt.sign(payload, secret)
      expect(jwtSessionService.verifyOne(accessToken)).toEqual(expect.objectContaining({
        id: payload.id,
        accessKey: payload.accessKey,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        iat: expect.anything()
      }))
    })

    it.each(['', null, undefined, 'totes not a valid JWT token'])('throws an error if a given access token is %p', (accessToken) => {
      expect(() => jwtSessionService.verifyOne(accessToken as string)).toThrowError()
    })

    it('throws an error if a given access token was signed with an incorrect secret', () => {
      const accessToken = jwt.sign({}, 'totes not the expected JWT secret')
      expect(() => jwtSessionService.verifyOne(accessToken)).toThrowError()
    })
  })
})
