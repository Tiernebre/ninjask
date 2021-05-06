import "./DraftPoolView.scss";
import { useCallback, useState } from "react";
import { useDidMount } from "rooks";
import { HttpDraftService } from "../api/draft/HttpDraftService";
import { HttpClient } from "../api/http";
import { Pokemon } from "../api/pokemon/Pokemon";
import { PokemonCard } from "../components/pokemon/PokemonCard";

type DraftPoolViewProps = {
  httpClient: HttpClient;
  draftId: number
};

export const DraftPoolView = ({ httpClient, draftId }: DraftPoolViewProps) => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  const fetchPokemon = useCallback(async () => {
    const draftService = new HttpDraftService(httpClient);
    setPokemon(await draftService.getPoolForOneWithId(Number(draftId)));
  }, [httpClient, draftId]);

  useDidMount(() => {
    fetchPokemon();
  });

  return (
    <div className="DraftPoolView">
      <h1 className="title has-text-centered">Draft Pool</h1>
      <p className="subtitle has-text-centered">
        Below are the pokemon that are pooled for Draft {draftId}.
      </p>
      <div className="DraftPoolView__pokemon p-5">
        {pokemon.map((individualPokemon) => (
          <PokemonCard key={individualPokemon.id} pokemon={individualPokemon} />
        ))}
      </div>
    </div>
  );
};
