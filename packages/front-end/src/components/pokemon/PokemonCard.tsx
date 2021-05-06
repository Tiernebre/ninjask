import "./PokemonCard.scss";
import { Pokemon } from "../../api/pokemon";

type PokemonCardProps = {
  pokemon: Pokemon
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <div className="PokemonCard p-5">
      <img src={pokemon.imageUrls.thumbnail} alt={pokemon.name} className="mb-3"/>
      <h4 className="PokemonCard__name">{ pokemon.name }</h4>
    </div>
  );
};
