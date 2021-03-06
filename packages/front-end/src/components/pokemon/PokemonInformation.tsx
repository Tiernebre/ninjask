import { Pokemon } from "../../api/pokemon/Pokemon";
import "./PokemonInformation.scss";

type PokemonInformationProps = {
  pokemon?: Pokemon | null;
  emptyPlaceholder: string;
};

export const PokemonInformation = ({
  pokemon,
  emptyPlaceholder,
}: PokemonInformationProps): JSX.Element => {
  return pokemon ? (
    <div className="PokemonInformation">
      <img
        className="PokemonInformation__image"
        src={pokemon.imageUrls.image}
        alt={pokemon.name}
      ></img>
      <h3 className="PokemonInformation__name mt-5 title">{pokemon.name}</h3>
    </div>
  ) : (
    <p>{emptyPlaceholder}</p>
  );
};
