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

export const generateDraftSelections = (): DraftSelection[] => {
  const draftSelections = [];
  for (let i = 0; i < 20; i++) {
    draftSelections.push(generateDraftSelection());
  }
  return draftSelections;
};
