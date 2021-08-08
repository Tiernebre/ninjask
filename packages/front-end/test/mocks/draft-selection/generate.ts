import { DraftSelection } from "../../../src/api";
import { generateRandomNumber, generateRandomString } from "../../random";
import { generatePokemon } from "../pokemon";

export const generateDraftSelection = (completed = false): DraftSelection => ({
  id: generateRandomNumber(),
  round: generateRandomNumber(),
  pick: generateRandomNumber(),
  userNickname: generateRandomString(),
  userId: generateRandomNumber(),
  selection: completed ? generatePokemon() : null,
});
