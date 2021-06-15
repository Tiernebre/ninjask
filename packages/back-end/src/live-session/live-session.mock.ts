import { LiveSessionTicketEntity } from "./live-session-ticket.entity";
import { v4 as uuid } from "uuid";
import { generateRandomNumber } from "../random";
import { LiveSessionPayload } from "./live-session-payload";
import { LiveSession } from "./live-session";

export const generateMockLiveSessionTicketEntity =
  (): LiveSessionTicketEntity => {
    const liveSessionTicket = new LiveSessionTicketEntity();
    liveSessionTicket.token = uuid();
    liveSessionTicket.createdAt = new Date();
    liveSessionTicket.redeemed = false;
    liveSessionTicket.userId = generateRandomNumber();
    return liveSessionTicket;
  };

export const generateMockLiveSessionPayload = (): LiveSessionPayload => ({
  userId: generateRandomNumber(),
});

export const generateMockLiveSession = (): LiveSession => ({ ticket: uuid() });
