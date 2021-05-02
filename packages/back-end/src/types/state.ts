import { DefaultState } from "koa";
import { SessionPayload } from "../session/session-payload";

export interface ContextState extends DefaultState {
  session: SessionPayload;
}
