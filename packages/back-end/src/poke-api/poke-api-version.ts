import { Name, NamedAPIResource } from "./utility";

export interface PokeApiVersion {
  id: number
  name: string;
  names: Name[];
  version_group: NamedAPIResource;
}
