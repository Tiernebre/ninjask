export class Version {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly versionGroupUrl: string,
    public deniedPokemonIds: number[]
  ) {}
}
