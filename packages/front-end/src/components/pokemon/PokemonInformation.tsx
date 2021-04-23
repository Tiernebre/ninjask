import { Pokemon } from "../../api/pokemon/Pokemon";
import "./PokemonInformation.css";

type PokemonInformationProps = {
  pokemon?: Pokemon;
  emptyPlaceholder: string;
};

export const PokemonInformation = ({
  pokemon,
  emptyPlaceholder,
}: PokemonInformationProps) => {
  return pokemon ? (
    <div className="PokemonInformation">
      <img
        className="PokemonInformation__image"
        src={pokemon.imageUrl}
        alt={`${pokemon.name}`}
      ></img>
      <p className="PokemonInformation__name">{pokemon.name}</p>
    </div>
  ) : (
    <p>{emptyPlaceholder}</p>
  );
};