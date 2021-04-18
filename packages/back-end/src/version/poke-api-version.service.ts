import { fetchOk } from "../http";
import { HttpClient } from "../http/http-client";
import {
  PokeApiPokedex,
  PokeApiVersion,
  PokeApiVersionGroup,
} from "../poke-api";
import { VersionService } from "./version.service";

export class PokeApiVersionService implements VersionService {
  constructor(private readonly pokeApiHttpClient: HttpClient) {}

  getOneById(id: number): Promise<PokeApiVersion> {
    return this.pokeApiHttpClient.get(`version/${id}`);
  }

  async getPokedexFromOneWithId(id: number): Promise<PokeApiPokedex> {
    const version = await this.getOneById(id);
    const versionGroup = await fetchOk<PokeApiVersionGroup>(
      version.version_group.url
    );
    const [pokedex] = versionGroup.pokedexes;
    return fetchOk(pokedex.url);
  }
}
