import { useMemo } from "react";
import { FetchHttpClient, HttpClient } from "../../api";
import { useSession } from "../session";

export type HttpHookReturnValue = {
  httpClient: HttpClient;
};

export const useHttp = (): HttpHookReturnValue => {
  const { accessToken } = useSession();

  const httpClient = useMemo(
    () =>
      new FetchHttpClient(
        process.env.REACT_APP_BACK_END_API_HTTP_URL,
        accessToken
      ),
    [accessToken]
  );

  return {
    httpClient,
  };
};
