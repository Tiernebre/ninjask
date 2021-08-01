export interface Version {
  readonly id: number;
  readonly name: string;
  readonly versionGroupUrl: string;
  deniedPokemonIds: Set<number>;
}
