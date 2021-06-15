import { generateMockSessionPayload } from "../session/session.mock"
import { LiveSessionService } from '.'
import { Repository } from "typeorm"
import { LiveSessionTicketEntity } from "./live-session-ticket.entity"
import { object, when } from "testdouble"
import { generateMockLiveSessionTicketEntity } from "./live-session.mock"
import { INVALID_NUMBER_CASES } from "../test/cases";
import { ZodError } from "zod"

describe("LiveSessionService", () => {
  let liveSessionService: LiveSessionService
  let liveSessionTicketRepository: Repository<LiveSessionTicketEntity>

  beforeEach(() => {
    liveSessionTicketRepository = object<Repository<LiveSessionTicketEntity>>()
    liveSessionService = new LiveSessionService(liveSessionTicketRepository)
  })

  describe("createOne", () => {
    it.each(INVALID_NUMBER_CASES)("throws ZodError if the SessionPayload has user id = %p", async (userId) => {
      await expect(liveSessionService.createOne({ ...generateMockSessionPayload(), userId: userId as number })).rejects.toThrowError(ZodError)
    })

    it("returns the created live session ticket", async () => {
      const session = generateMockSessionPayload()
      const createdLiveSessionTicketEntity = generateMockLiveSessionTicketEntity()
      when(liveSessionTicketRepository.create({ userId: session.userId })).thenReturn(createdLiveSessionTicketEntity)
      when(liveSessionTicketRepository.save(createdLiveSessionTicketEntity)).thenResolve(createdLiveSessionTicketEntity)
      await expect(liveSessionService.createOne(session)).resolves.toEqual({ ticket: createdLiveSessionTicketEntity.token })
    })
  })
})