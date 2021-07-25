import { Challenge } from "../../../api";

export type UseGetChallengesReturnValue = {
  challenges: Challenge[];
};

export const useGetChallengesApi = (): UseGetChallengesReturnValue => {
  return {
    challenges: [],
  };
};
