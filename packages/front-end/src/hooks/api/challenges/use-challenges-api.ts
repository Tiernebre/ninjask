import { useCallback } from "react";
import { useHttp } from "../..";
import { Challenge, CreateChallengeRequest } from "../../../api";

type ChallengesApi = {
  getAllChallenges: () => Promise<Challenge[]>;
  getChallengesForCurrentUser: () => Promise<Challenge[]>;
  getChallengeById: (id: number) => Promise<Challenge>;
  deleteChallengeById: (id: number) => Promise<void>;
  createChallenge: (request: CreateChallengeRequest) => Promise<Challenge>;
};

export const useChallengesApi = (): ChallengesApi => {
  const { httpClient } = useHttp();

  const getAllChallenges = useCallback(() => {
    return httpClient.get<Challenge[]>("challenges");
  }, [httpClient]);

  const getChallengesForCurrentUser = useCallback(() => {
    return httpClient.get<Challenge[]>("me/challenges");
  }, [httpClient]);

  const getChallengeById = useCallback(
    (id: number) => {
      return httpClient.get<Challenge>(`challenges/${id}`);
    },
    [httpClient]
  );

  const deleteChallengeById = useCallback(
    (id: number) => {
      return httpClient.delete(`challenges/${id}`);
    },
    [httpClient]
  );

  const createChallenge = useCallback(
    (request: CreateChallengeRequest) => {
      return httpClient.post<Challenge>("challenges", request);
    },
    [httpClient]
  );

  return {
    getAllChallenges,
    getChallengesForCurrentUser,
    getChallengeById,
    deleteChallengeById,
    createChallenge,
  };
};
