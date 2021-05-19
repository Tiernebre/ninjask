import "./DraftPoolView.scss";
import { useCallback, useState } from "react";
import { useDidMount } from "rooks";
import { Pokemon } from "../../api/pokemon/Pokemon";
import { PokemonCard } from "../../components/pokemon/PokemonCard";
import { DraftService } from "../../api/draft/DraftService";
import { HeadingGroup } from "../../components/heading-group";

type DraftPoolViewProps = {
  draftService: DraftService;
  draftId: number;
  challengeName: string;
};

export const DraftPoolView = ({
  draftService,
  draftId,
  challengeName,
}: DraftPoolViewProps) => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  const fetchPokemon = useCallback(async () => {
    setPokemon(await draftService.getPoolForOneWithId(Number(draftId)));
  }, [draftService, draftId]);

  useDidMount(() => {
    fetchPokemon();
  });

  return (
    <div className="DraftPoolView">
      <HeadingGroup 
        title="Draft Pool"
        subtitle={`Below are the pokemon that are pooled for ${challengeName}.`}
      />
      <div className="DraftPoolView__pokemon p-5">
        {pokemon.map((individualPokemon) => (
          <PokemonCard key={individualPokemon.id} pokemon={individualPokemon} />
        ))}
      </div>
    </div>
  );
};
