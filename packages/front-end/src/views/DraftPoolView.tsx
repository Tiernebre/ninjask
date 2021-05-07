import "./DraftPoolView.scss";
import { useCallback, useState } from "react";
import { useDidMount } from "rooks";
import { Pokemon } from "../api/pokemon/Pokemon";
import { PokemonCard } from "../components/pokemon/PokemonCard";
import { DraftService } from "../api/draft/DraftService";

type DraftPoolViewProps = {
  draftService: DraftService
  draftId: number
};

export const DraftPoolView = ({ draftService, draftId }: DraftPoolViewProps) => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  const fetchPokemon = useCallback(async () => {
    setPokemon(await draftService.getPoolForOneWithId(Number(draftId)));
  }, [draftService, draftId]);

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
