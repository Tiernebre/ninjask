import { Repository } from "typeorm";
import { LiveSessionTicketEntity } from "./live-session-ticket.entity";
import { SessionPayload } from "../session";
import { LiveSession } from "./live-session";

export class LiveSessionService {
  constructor(
    private readonly liveSessionTicketRepository: Repository<LiveSessionTicketEntity>
  ) {}

  async createOne({ userId }: SessionPayload): Promise<LiveSession> {
    const { id: ticket } =
      await this.liveSessionTicketRepository.save(
        this.liveSessionTicketRepository.create({
          userId,
        })
      );
    return {
      ticket
    };
  }
}
