export interface Version {
  readonly id: number;
  readonly name: string;
  readonly versionGroupUrl: string;
  readonly deniedPokemonIds: Record<string, string>;
}
