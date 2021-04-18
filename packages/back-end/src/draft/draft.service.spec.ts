import { matchers, object, when } from "testdouble"
import { Repository } from "typeorm"
import { PokemonService } from "../pokemon/pokemon.service"
import { VersionService } from "../version/version.service"
import { DraftEntity } from "./draft.entity"
import { generateMockDraftEntity } from "./draft.mock"
import { DraftService } from "./draft.service"

describe('DraftService', () => {
  let draftService: DraftService
  let draftRepository: Repository<DraftEntity>
  let versionService: VersionService
  let pokemonService: PokemonService

  beforeEach(() => {
    draftRepository = object<Repository<DraftEntity>>()
    versionService = object<VersionService>()
    pokemonService = object<PokemonService>()
    draftService = new DraftService(
      draftRepository,
      versionService,
      pokemonService
    )
  })

  describe('getOneById', () => {
    it('returns the found draft entity if it exists', async () => {
      const id = 1
      const expected = generateMockDraftEntity()
      when(draftRepository.findOne(id, matchers.anything())).thenResolve(expected)
      const gotten = await draftService.getOneById(id)
      expect(gotten).toEqual(expected)
    })
  })
})
