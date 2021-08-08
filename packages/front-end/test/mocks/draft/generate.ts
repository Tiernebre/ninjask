import { Draft } from "../../../src/api";
import { generateRandomNumber } from "../../random";
import { Writeable } from "../../types/writeable";

export const generateDraft = (): Writeable<Draft> => {
  return {
    id: generateRandomNumber(),
    poolSize: generateRandomNumber(),
    livePoolingHasFinished: false,
  };
};
