import { Pokemon } from "../../api/pokemon";

type PokemonCardProps = {
  pokemon: Pokemon
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <div className="PokemonCard">
      <img src={pokemon.imageUrls.thumbnail} alt={pokemon.name} />
      <h4>{ pokemon.name }</h4>
    </div>
  );
};
