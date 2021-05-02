interface PokemonImageUrls {
  readonly icon: string;
  readonly image: string;
  readonly thumbnail: string;
}

export interface Pokemon {
  readonly id: number;
  readonly name: string;
  readonly imageUrls: PokemonImageUrls;
}
