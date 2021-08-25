import { useDidMount, HeadingGroup, Container } from "@tiernebre/kecleon";
import { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Pokemon } from "../../api";
import { PokemonCard } from "../../components";
import { useDraftApi } from "../../hooks";
import "./DraftPoolView.scss";

type DraftPoolViewParams = {
  draftId: string;
};

export const DraftPoolView = (): JSX.Element => {
  const { draftId } = useParams<DraftPoolViewParams>();
  const { getPoolForDraft } = useDraftApi();
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  const fetchPokemon = useCallback(async () => {
    setPokemon(await getPoolForDraft(Number(draftId)));
  }, [getPoolForDraft, draftId]);

  useDidMount(() => {
    void fetchPokemon();
  });

  return (
    <Container>
      <div className="DraftPoolView">
        <HeadingGroup title="Draft Pool" />
        <div className="DraftPoolView__pokemon p-5">
          {pokemon.map((individualPokemon) => (
            <PokemonCard
              key={individualPokemon.id}
              pokemon={individualPokemon}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};
