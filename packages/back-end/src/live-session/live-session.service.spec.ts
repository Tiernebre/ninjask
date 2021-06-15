import { generateMockSessionPayload } from "../session/session.mock"
import { LiveSessionService } from '.'
import { Repository } from "typeorm"
import { LiveSessionTicketEntity } from "./live-session-ticket.entity"
import { object, when } from "testdouble"
import { generateMockLiveSessionTicketEntity } from "./live-session.mock"
import { INVALID_NUMBER_CASES, INVALID_STRING_CASES } from "../test/cases";
import { ZodError } from "zod"
import { v4 as uuid } from 'uuid'
import { UnauthorizedError } from "../error"

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

  describe("redeemOne", () => {
    it.each(INVALID_STRING_CASES)("throws ZodError if the provided ticket is %p", async (ticket) => {
      await expect(liveSessionService.redeemOne(ticket as string)).rejects.toThrowError(ZodError)
    })

    it("throws UnauthorizedError if a ticket was not found with the credentials provided", async () => {
      const ticket = uuid()
      when(liveSessionTicketRepository.findOne({ token: ticket, redeemed: false })).thenResolve(undefined)
      await expect(liveSessionService.redeemOne(ticket)).rejects.toThrowError(UnauthorizedError)
    })

    it("returns the redeemed live session payload", async () => {
      const ticket = uuid()
      const expectedLiveSessionTicket = generateMockLiveSessionTicketEntity()
      when(liveSessionTicketRepository.findOne({ token: ticket, redeemed: false })).thenResolve(expectedLiveSessionTicket)
      await expect(liveSessionService.redeemOne(ticket)).resolves.toEqual({ userId: expectedLiveSessionTicket.userId })
    })
  })
})