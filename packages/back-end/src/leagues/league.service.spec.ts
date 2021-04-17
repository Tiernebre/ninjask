import { Repository } from 'typeorm'
import { LeagueEntity } from './league.entity'
import { LeagueService } from './league.service'
import { object, when } from 'testdouble'
import { Logger } from '../logger'
import { generateMockLeagueEntity } from './league.mock'

describe('LeagueService', () => {
  let leagueService: LeagueService
  let leagueRepository: Repository<LeagueEntity>

  beforeEach(() => {
    leagueRepository = object<Repository<LeagueEntity>>()
    leagueService = new LeagueService(leagueRepository, object<Logger>())
  })

  describe('getAll', () => {
    it('returns all of the leagues', async () => {
      const entities = [
        generateMockLeagueEntity(),
        generateMockLeagueEntity()
      ]
      when(leagueRepository.find()).thenResolve(entities)
      const gottenLeagues = await leagueService.getAll()
      const [firstEntity, secondEntity] = entities
      const [firstLeague, secondLeague] = gottenLeagues
      expect(firstLeague).toEqual({
        id: firstEntity.id,
        name: firstEntity.name,
        description: firstEntity.description
      })
      expect(secondLeague).toEqual({
        id: secondEntity.id,
        name: secondEntity.name,
        description: secondEntity.description
      })
    })
  })
})
