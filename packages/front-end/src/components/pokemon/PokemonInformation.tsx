import { Pokemon } from "../../api/pokemon/Pokemon";

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
        alt={pokemon.name}
      ></img>
      <p className="PokemonInformation__name mt-5">{pokemon.name}</p>
    </div>
  ) : (
    <p>{emptyPlaceholder}</p>
  );
};
