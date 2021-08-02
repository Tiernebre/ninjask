import { Season } from "../../../api";

type GetSeasonsHookReturnValue = {
  seasons: Season[];
};

export const getSeasons = (): GetSeasonsHookReturnValue => {
  return {
    seasons: [],
  };
};
