import { Version } from "../../../src/api";
import { generateMockVersion } from "./generate";

const createVersions = (): Version[] => {
  const versions = [];
  for (let i = 0; i < 40; i++) {
    versions.push(generateMockVersion());
  }
  return versions;
};

export const versions = createVersions();
