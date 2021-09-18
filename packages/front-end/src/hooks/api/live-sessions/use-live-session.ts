import { useDidMount } from "@tiernebre/kecleon";
import { useState } from "react";
import { useLiveSessionApi } from "./use-live-session-api";

type LiveSessionHookReturnValue = {
  liveSessionToken: string | undefined;
};

export const useLiveSession = (): LiveSessionHookReturnValue => {
  const [liveSessionToken, setLiveSessionToken] = useState<string>();
  const { createOne } = useLiveSessionApi();

  const updateSessionToken = async () => {
    const liveSession = await createOne();
    setLiveSessionToken(liveSession.ticket);
  };

  useDidMount(() => {
    void updateSessionToken();
  });

  return {
    liveSessionToken,
  };
};
