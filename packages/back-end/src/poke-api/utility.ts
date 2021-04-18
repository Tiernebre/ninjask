// Common Typings Across all PokeAPI Types.

export interface NamedAPIResource {
  // The name of the referenced resource.
  name: string;

  // The URL of the referenced resource.
  url: string;
}

export interface NamedAPIResourceList {
  // The total number of resources available from this API.
  count: number;

  // The URL for the next page in the list.
  next: string;

  // The URL for the previous page in the list.
  prev: string;

  // A list of named API resources.
  results: NamedAPIResource[];
}

export interface Name {
  name: string;
  language: NamedAPIResource;
}

export interface Description {
  description: string;
  language: NamedAPIResource;
}
