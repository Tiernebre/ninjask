import { Repository } from "typeorm";
import { LiveSessionTicketEntity } from "./live-session-ticket.entity";
import { SessionPayload } from "../session";
import { LiveSession } from "./live-session";
import { LiveSessionPayload } from "./live-session-payload";
import { UnauthorizedError } from "../error";

export class LiveSessionService {
  constructor(
    private readonly liveSessionTicketRepository: Repository<LiveSessionTicketEntity>
  ) {}

  async createOne({ userId }: SessionPayload): Promise<LiveSession> {
    const { token: ticket } =
      await this.liveSessionTicketRepository.save(
        this.liveSessionTicketRepository.create({
          userId,
        })
      );
    return {
      ticket
    };
  }

  async redeemOne(ticket: string): Promise<LiveSessionPayload> {
    const foundTicket = await this.liveSessionTicketRepository.findOne({ token: ticket, redeemed: false })
    if (!foundTicket) {
      throw new UnauthorizedError("You are not permitted to connect to the live session due to invalid authentication")
    }
    return {
      userId: foundTicket.userId
    }
  }
}
