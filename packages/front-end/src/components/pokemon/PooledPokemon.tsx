import { Pokemon } from "../../api/pokemon/Pokemon";
import "./PooledPokemon.scss";

type PooledPokemonProps = {
  pokemon: Pokemon[];
  poolSize: number;
};

const PooledPokemonListing = (pokemon: Pokemon) => (
  <li className="PooledPokemon__pokemon" key={pokemon.id}>
    <img src={pokemon.imageUrls.icon} alt={pokemon.name}></img>
    <p>{pokemon.name}</p>
  </li>
);

export const PooledPokemon = ({ pokemon, poolSize }: PooledPokemonProps) => {
  return (
    <div className="PooledPokemon">
      <h2 role="banner" className="PooledPokemon__heading">
        Pooled Pokemon ({pokemon.length} / {poolSize})
      </h2>
      <ol>{pokemon.map(PooledPokemonListing)}</ol>
    </div>
  );
};
