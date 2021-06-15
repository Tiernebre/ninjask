import { Repository } from "typeorm";
import { SessionPayload } from "./session-payload";

export class LiveSessionService {
  constructor(private readonly liveSessionTicketRepository: Repository<>) {}

  async createTicketForSession(session: SessionPayload): Promise<string> {}
}
