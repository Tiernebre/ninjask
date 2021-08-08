import { challengeHandlers } from "./challenge-handlers";
import { challengeResultHandlers } from "./challenge-result-handlers";
import { sessionHandlers } from "./session-handlers";
import { versionsHandler } from "./versions-handler";
import { seasonHandlers } from "./season-handlers";
import { leagueHandlers } from "./league-handlers";
import { draftHandlers } from "./draft-handlers";

export const handlers = [
  ...sessionHandlers,
  ...challengeHandlers,
  ...challengeResultHandlers,
  ...draftHandlers,
  ...versionsHandler,
  ...seasonHandlers,
  ...leagueHandlers,
];
