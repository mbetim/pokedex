import { useMemo } from "react";
import useSWR from "swr";
import axios from "axios";
import { Pokemon } from "types/Pokemon";

type UsePokemon = () => {
  pokemons: Pokemon[];
  isLoading: boolean;
  isError: any;
};

export const fetcher = async (url: string) => {
  const { data } = await axios.get(url);
  return data;
};

export const usePokemons: UsePokemon = () => {
  const { data, error } = useSWR<{ results: Pokemon[] }>(
    "https://unpkg.com/pokemons@1.1.0/pokemons.json",
    fetcher
  );

  const pokemons = useMemo(() => {
    const mapPokemons = new Map();
    data?.results.forEach((pokemon) => {
      mapPokemons.set(pokemon.national_number, pokemon);
    });

    return Array.from(mapPokemons.values());
  }, [data?.results]);

  return {
    pokemons,
    isLoading: !error && !data,
    isError: error,
  };
};
