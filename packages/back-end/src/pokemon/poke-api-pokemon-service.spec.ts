import { HttpClient } from '../http/http-client'
import { PokeApiPokemonService } from './poke-api-pokemon-service'
import { object, when } from 'testdouble'
import { NamedAPIResourceList } from '../poke-api/named-api-resource-list'

describe('PokeApiPokemonService', () => {
  let pokeApiPokemonService: PokeApiPokemonService
  let pokeApiHttpClient: HttpClient

  beforeEach(() => {
    pokeApiHttpClient = object<HttpClient>()
    pokeApiPokemonService = new PokeApiPokemonService(pokeApiHttpClient)
  })

  describe('getAll', () => {
    it('returns a resource list of pokemon', async () => {
      const expected: NamedAPIResourceList = {
        count: 1,
        next: '',
        prev: '',
        results: [
          {
            name: '',
            url: ''
          }
        ]
      }
      when(pokeApiHttpClient.get('pokemon')).thenResolve(expected)
      const response = await pokeApiPokemonService.getAll()
      expect(response).toEqual(expected)
    })
  })
})