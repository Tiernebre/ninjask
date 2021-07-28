import { Version } from "../../../src/api";
import { generateMockVersion } from "./generate";

const versionNames = [
  "red",
  "blue",
  "yellow",
  "gold",
  "silver",
  "crystal",
  "ruby",
  "sapphire",
  "emerald",
  "firered",
  "leafgreen",
  "diamond",
  "pearl",
  "platinum",
  "heartgold",
  "soulsilver",
  "black",
  "white",
  "colosseum",
  "xd",
  "black-2",
  "white-2",
  "x",
  "y",
  "omega-ruby",
  "alpha-sapphire",
  "sun",
  "moon",
  "ultra-sun",
  "ultra-moon",
  "lets-go-pikachu",
  "lets-go-eevee",
  "sword",
  "shield",
];

const createVersions = (): Version[] => {
  const versions = [];
  for (let i = 0; i < versionNames.length; i++) {
    versions.push(
      generateMockVersion({
        id: i + 1,
        name: versionNames[i],
      })
    );
  }
  return versions;
};

export const versions = createVersions();
