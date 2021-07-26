import { useCallback, useMemo, useState } from "react";
import { HttpVersionService } from "../../../api/version/HttpVersionService";
import { Version } from "../../../api/version/Version";
import { useHttp } from "../../http";

export type UseVersionsApiReturnValue = {
  versions: Version[];
  fetchVersions: () => Promise<void>;
};

export const useVersionsApi = (): UseVersionsApiReturnValue => {
  const { httpClient } = useHttp();

  const versionService = useMemo(
    () => new HttpVersionService(httpClient),
    [httpClient]
  );

  const [versions, setVersions] = useState<Version[]>([]);

  const fetchVersions = useCallback(async () => {
    setVersions(await versionService.getAll());
  }, [versionService, setVersions]);

  return {
    versions,
    fetchVersions,
  };
};
