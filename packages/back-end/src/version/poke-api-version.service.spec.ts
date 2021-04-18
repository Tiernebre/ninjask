import { HttpClient } from '../http'
import { PokeApiVersionService } from './poke-api-version.service'
import { object, when } from 'testdouble'
import { generateMockPokeApiVersion } from '../poke-api/games.mock'

describe('PokeApiVersionService', () => {
  let pokeApiVersionService: PokeApiVersionService
  let pokeApiHttpClient: HttpClient

  beforeEach(() => {
    pokeApiHttpClient = object<HttpClient>();
    pokeApiVersionService = new PokeApiVersionService(pokeApiHttpClient)
  })

  describe('getOneById', () => {
    it('returns a found version', async () => {
      const expected = generateMockPokeApiVersion()
      when(pokeApiHttpClient.get(`version/${expected.id}`)).thenResolve(expected)
      const gotten = await pokeApiVersionService.getOneById(expected.id)
      expect(gotten).toEqual(expected)
    })
  })
})
