import { useMemo } from "react";
import { FetchHttpClient, HttpClient } from "../../api";
import { useSession } from "../session";

export type HttpHookReturnValue = {
  httpClient: HttpClient;
};

export const useHttp = (): HttpHookReturnValue => {
  const { accessToken } = useSession();

  const httpClient = useMemo(
    () => new FetchHttpClient(accessToken),
    [accessToken]
  );
  return {
    httpClient,
  };
};
