import { Version } from "../../../src/api";
import {
  generateRandomNumber,
  generateRandomString,
} from "../../random/random";

export const generateMockVersion = ({
  id,
  name,
}: Partial<Version>): Version => ({
  id: id || generateRandomNumber(),
  name: name || generateRandomString(),
  versionGroupUrl: generateRandomString(),
  deniedPokemonIds: {},
});
