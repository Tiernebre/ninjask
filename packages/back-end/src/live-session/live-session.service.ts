import { Repository } from "typeorm";
import { LiveSessionTicketEntity } from "./live-session-ticket.entity";
import { SessionPayload, sessionPayloadSchema } from "../session";
import { LiveSession } from "./live-session";
import { LiveSessionPayload } from "./live-session-payload";
import { UnauthorizedError } from "../error";
import { z } from "zod";

export class LiveSessionService {
  constructor(
    private readonly liveSessionTicketRepository: Repository<LiveSessionTicketEntity>
  ) {}

  async createOne(session: SessionPayload): Promise<LiveSession> {
    sessionPayloadSchema.parse(session)

    const { token: ticket } = await this.liveSessionTicketRepository.save(
      this.liveSessionTicketRepository.create({
        userId: session.userId,
      })
    );
    return {
      ticket,
    };
  }

  async redeemOne(ticket: string): Promise<LiveSessionPayload> {
    z.string().min(1).parse(ticket)

    const foundTicket = await this.liveSessionTicketRepository.findOne({
      token: ticket,
      redeemed: false,
    });
    if (!foundTicket) {
      throw new UnauthorizedError(
        "You are not permitted to connect to the live session due to invalid authentication"
      );
    }
    await this.liveSessionTicketRepository.update(foundTicket.token, {
      redeemed: true,
    });
    return {
      userId: foundTicket.userId,
    };
  }
}
