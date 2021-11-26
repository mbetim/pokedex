import React, { useMemo, useState } from "react";
// Material ui
import { Box, Grid, Pagination } from "@mui/material";
// Components
import { PokemonCard } from "./PokemonCard";
// Utils
import { usePokemons } from "hooks/usePokemons";
import { SearchInput } from "SearchInput";

const maxPokemonsPerPage = 10;

export const ListPokemons: React.FC = () => {
  // Hooks
  const { pokemons } = usePokemons();

  // States
  const [search, setSearch] = useState("");
  const [favoritePokemons, setFavoritePokemons] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPokemons = useMemo(() => {
    const regex = new RegExp(search, "i");
    return pokemons.filter(
      (pokemon) => regex.test(pokemon.name) || regex.test(pokemon.national_number)
    );
  }, [search, pokemons]);

  const paginatedPokemons = useMemo(() => {
    return filteredPokemons.slice(
      (currentPage - 1) * maxPokemonsPerPage,
      (currentPage - 1) * maxPokemonsPerPage + maxPokemonsPerPage
    );
  }, [filteredPokemons, currentPage]);

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
      <Grid container sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6}>
          <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />
        </Grid>
      </Grid>

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
