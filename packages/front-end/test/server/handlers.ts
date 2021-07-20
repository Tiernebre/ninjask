import { challengeHandlers } from "./challenge-handlers";
import { challengeResultHandlers } from "./challenge-result-handlers";
import { sessionHandlers } from "./session-handlers";

export const handlers = [
  ...sessionHandlers,
  ...challengeHandlers,
  ...challengeResultHandlers,
];
