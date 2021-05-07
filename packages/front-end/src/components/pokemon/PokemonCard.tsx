import "./PokemonCard.scss";
import { Pokemon } from "../../api/pokemon";

type PokemonCardProps = {
  pokemon: Pokemon;
};

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <div className="PokemonCard p-5">
      <img
        src={pokemon.imageUrls.thumbnail}
        alt={pokemon.name}
        className="mb-3"
      />
      <h4 className="PokemonCard__name">{pokemon.name}</h4>
      <a href={`https://pokemondb.net/pokedex/${pokemon.name}`} target="_blank" rel="noreferrer">PokemonDB</a>
      <a href={`https://bulbapedia.bulbagarden.net/wiki/${pokemon.name}_(Pok%C3%A9mon)`} target="_blank" rel="noreferrer">Bulbapedia</a>
    </div>
  );
};
