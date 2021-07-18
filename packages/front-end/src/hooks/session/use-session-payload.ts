import { SessionPayload } from "../../api";
import { useSession } from "./use-session";

export const useSessionPayload = (): SessionPayload => {
  const { sessionPayload } = useSession();
  if (!sessionPayload) {
    throw Error("There is no proper session, could not load Session Payload");
  }
  return sessionPayload;
};
