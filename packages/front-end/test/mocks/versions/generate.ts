import { Version } from "../../../src/api";
import {
  generateRandomNumber,
  generateRandomString,
} from "../../random/random";

export const generateMockVersion = (): Version => ({
  id: generateRandomNumber(),
  name: generateRandomString(),
  versionGroupUrl: generateRandomString(),
  deniedPokemonIds: {},
});
