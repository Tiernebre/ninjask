import { Pokemon } from "../../api/pokemon/Pokemon";
import "./PooledPokemon.scss";

type PooledPokemonProps = {
  pokemon: Pokemon[];
};

const PooledPokemonListing = (pokemon: Pokemon) => (
  <li className="PooledPokemon__pokemon" key={pokemon.id}>
    <img src={pokemon.iconUrl} alt={pokemon.name}></img>
    <p>{pokemon.name}</p>
  </li>
);

export const PooledPokemon = ({ pokemon }: PooledPokemonProps) => {
  return (
    <div className="PooledPokemon">
      <h2 className="PooledPokemon__heading">Pooled Pokemon</h2>
      <ol>{pokemon.map(PooledPokemonListing)}</ol>
    </div>
  );
};
