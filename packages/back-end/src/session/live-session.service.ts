import { Repository } from "typeorm";
import { LiveSessionTicketEntity } from "./live-session-ticket.entity";
import { SessionPayload } from "./session-payload";

export class LiveSessionService {
  constructor(
    private readonly liveSessionTicketRepository: Repository<LiveSessionTicketEntity>
  ) {}

  async createTicketForSession({ userId }: SessionPayload): Promise<string> {
    const { id: liveSessionTicket } =
      await this.liveSessionTicketRepository.save(
        this.liveSessionTicketRepository.create({
          userId,
        })
      );
    return liveSessionTicket;
  }
}
