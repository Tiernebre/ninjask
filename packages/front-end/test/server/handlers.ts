import { challengeHandlers } from "./challenge-handlers";
import { challengeResultHandlers } from "./challenge-result-handlers";
import { sessionHandlers } from "./session-handlers";
import { versionsHandler } from "./versions-handler";
import { seasonHandlers } from "./season-handlers";

export const handlers = [
  ...sessionHandlers,
  ...challengeHandlers,
  ...challengeResultHandlers,
  ...versionsHandler,
  ...seasonHandlers,
];
