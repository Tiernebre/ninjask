import { useCallback } from "react";
import { useHttp } from "../..";
import { LiveSession } from "../../../api";

type LiveSessionApi = {
  createOne(): Promise<LiveSession>;
};

export const useLiveSessionApi = (): LiveSessionApi => {
  const { httpClient } = useHttp();

  const createOne = useCallback(() => {
    return httpClient.post<LiveSession>("live-sessions");
  }, [httpClient]);

  return {
    createOne,
  };
};
