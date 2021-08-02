import { Season } from "../../../api/season/Season";

type GetSeasonsHookReturnValue = {
  seasons: Season[];
};

export const getSeasons = (): GetSeasonsHookReturnValue => {
  return {
    seasons: [],
  };
};
