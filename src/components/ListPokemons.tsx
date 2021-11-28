import React, { useEffect, useMemo, useState } from "react";
// Material ui
import { Box, Grid, Pagination } from "@mui/material";
// Components
import { PokemonCard } from "./PokemonCard";
// Utils
import { usePokemons } from "hooks/usePokemons";
import { SearchInput } from "SearchInput";
import { FilterByTypeList } from "./FilterByTypeList";
import { FilterByFavorites } from "./FilterByFavorites";

const maxPokemonsPerPage = 10;

export const ListPokemons: React.FC = () => {
  // Hooks
  const { pokemons } = usePokemons();

  // States
  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isFavoriteFilterChecked, setIsFavoriteFilterChecked] = useState(false);
  const [favoritePokemons, setFavoritePokemons] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Memoized values
  const favoritePokemonsMemoized = useMemo(() => {
    if (!isFavoriteFilterChecked) return pokemons;

    if (!favoritePokemons.length) return [];

    return pokemons.filter((pokemon) => favoritePokemons.includes(pokemon.national_number));
  }, [isFavoriteFilterChecked, pokemons, favoritePokemons]);

  const pokemonsFilteredByType = useMemo(() => {
    if (selectedTypes.length === 0) return favoritePokemonsMemoized;

    return favoritePokemonsMemoized.filter((pokemon) =>
      selectedTypes.every((type) => pokemon.type.includes(type))
    );
  }, [favoritePokemonsMemoized, selectedTypes]);

  const pokemonsFilteredBySearch = useMemo(() => {
    const regex = new RegExp(search, "i");
    return pokemonsFilteredByType.filter(
      (pokemon) => regex.test(pokemon.name) || regex.test(pokemon.national_number)
    );
  }, [search, pokemonsFilteredByType]);

  const paginatedPokemons = useMemo(() => {
    return pokemonsFilteredBySearch.slice(
      (currentPage - 1) * maxPokemonsPerPage,
      (currentPage - 1) * maxPokemonsPerPage + maxPokemonsPerPage
    );
  }, [pokemonsFilteredBySearch, currentPage]);

  useEffect(() => setCurrentPage(1), [pokemonsFilteredBySearch]);

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

      <Grid container>
        <Grid item xs={12} sm={2}>
          <FilterByTypeList
            selectedTypes={selectedTypes}
            onChange={(newSelectedTypes) => setSelectedTypes(newSelectedTypes)}
          />

          <FilterByFavorites
            value={isFavoriteFilterChecked}
            onChange={() => setIsFavoriteFilterChecked((prev) => !prev)}
          />
        </Grid>

        <Grid item xs={12} sm={9}>
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
        </Grid>
      </Grid>

      <Pagination
        color="primary"
        page={currentPage}
        count={Math.ceil(pokemonsFilteredBySearch.length / maxPokemonsPerPage)}
        showFirstButton
        showLastButton
        onChange={(e, page) => setCurrentPage(page)}
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      />
    </div>
  );
};
