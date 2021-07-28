import { Version } from "../../../src/api";
import {
  generateRandomNumber,
  generateRandomString,
} from "../../random/random";

export const generateMockVersion = ({ name }: Partial<Version>): Version => ({
  id: generateRandomNumber(),
  name: name || generateRandomString(),
  versionGroupUrl: generateRandomString(),
  deniedPokemonIds: {},
});
