import React, { useMemo, useState } from "react";
// Material ui
import { Box, Pagination } from "@mui/material";
// Components
import { PokemonCard } from "./PokemonCard";
// Utils
import { usePokemons } from "hooks/usePokemons";
import { Pokemon } from "types/Pokemon";

const maxPokemonsPerPage = 10;

export const ListPokemons: React.FC = () => {
  // Hooks
  const { pokemons } = usePokemons();

  // States
  const [favoritePokemons, setFavoritePokemons] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedPokemons = useMemo(() => {
    return pokemons.slice(
      (currentPage - 1) * maxPokemonsPerPage,
      (currentPage - 1) * maxPokemonsPerPage + maxPokemonsPerPage
    );
  }, [pokemons, currentPage]);

  const toggleFavorite = (id: string) => {
    const index = favoritePokemons.indexOf(id);

    if (index === -1) {
      setFavoritePokemons([...favoritePokemons, id]);
    } else {
      setFavoritePokemons([
        ...favoritePokemons.slice(0, index),
        ...favoritePokemons.slice(index + 1),
      ]);
    }
  };

  return (
    <div>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {paginatedPokemons.map((pokemon) => (
          <Box key={pokemon.national_number} sx={{ m: 2 }}>
            <PokemonCard
              pokemon={pokemon}
              isFavorite={favoritePokemons.includes(pokemon.national_number)}
              onClick={() => toggleFavorite(pokemon.national_number)}
            />
          </Box>
        ))}
      </Box>

      <Pagination
        color="primary"
        page={currentPage}
        count={Math.ceil(pokemons.length / maxPokemonsPerPage)}
        showFirstButton
        showLastButton
        onChange={(e, page) => setCurrentPage(page)}
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      />
    </div>
  );
};
