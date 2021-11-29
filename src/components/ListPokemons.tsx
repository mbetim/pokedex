import React, { useEffect, useMemo, useState } from "react";
// Material ui
import { Box, Grid, Pagination, Typography } from "@mui/material";
// Components
import { PokemonCard } from "./PokemonCard";
import { SearchInput } from "SearchInput";
import { FilterByTypeList } from "./FilterByTypeList";
import { FilterByFavorites } from "./FilterByFavorites";
import { OrderByValue, SelectOrderBy } from "./SelectOrderBy";
// Utils
import { usePokemons } from "hooks/usePokemons";

const maxPokemonsPerPage = 10;

export const ListPokemons: React.FC = () => {
  // Hooks
  const { pokemons } = usePokemons();

  // States
  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [orderBy, setOrderBy] = useState<OrderByValue>("national_number:asc");
  const [isFavoriteFilterChecked, setIsFavoriteFilterChecked] = useState(false);
  const [favoritePokemons, setFavoritePokemons] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Memoized values
  // Filter favorite pokemons
  const favoritePokemonsMemoized = useMemo(() => {
    if (!isFavoriteFilterChecked) return pokemons;

    if (!favoritePokemons.length) return [];

    return pokemons.filter((pokemon) => favoritePokemons.includes(pokemon.national_number));
  }, [isFavoriteFilterChecked, pokemons, favoritePokemons]);

  // Filter pokemons by types
  const pokemonsFilteredByType = useMemo(() => {
    if (selectedTypes.length === 0) return favoritePokemonsMemoized;

    return favoritePokemonsMemoized.filter((pokemon) =>
      selectedTypes.every((type) => pokemon.type.includes(type))
    );
  }, [favoritePokemonsMemoized, selectedTypes]);

  // Filter pokemons by text search
  const pokemonsFilteredBySearch = useMemo(() => {
    const regex = new RegExp(search, "i");
    return pokemonsFilteredByType.filter(
      (pokemon) => regex.test(pokemon.name) || regex.test(pokemon.national_number)
    );
  }, [search, pokemonsFilteredByType]);

  // Order pokemons
  const pokemonsOrdered = useMemo(() => {
    console.log("order pokemons");
    const [field, order] = orderBy.split(":") as ["national_number" | "name", "asc" | "desc"];

    const pokemonsOrdered = pokemonsFilteredBySearch.sort((a, b) => {
      if (order === "asc") {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });

    return [...pokemonsOrdered];
  }, [orderBy, pokemonsFilteredBySearch]);

  // Pagination
  const pokemonsPerPage = useMemo(
    () =>
      pokemonsOrdered.slice(
        (currentPage - 1) * maxPokemonsPerPage,
        currentPage * maxPokemonsPerPage
      ),
    [currentPage, pokemonsOrdered]
  );

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
      <Grid container spacing={1} alignItems="center" sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6}>
          <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <SelectOrderBy value={orderBy} onChange={(newOrderValue) => setOrderBy(newOrderValue)} />
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
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {pokemonsPerPage.length ? (
              pokemonsPerPage.map((pokemon) => (
                <Box key={pokemon.national_number} sx={{ m: 2 }}>
                  <PokemonCard
                    pokemon={pokemon}
                    isFavorite={favoritePokemons.includes(pokemon.national_number)}
                    onClick={() => toggleFavorite(pokemon.national_number)}
                  />
                </Box>
              ))
            ) : (
              <Typography variant="h4" sx={{ my: "auto" }}>
                Nenhum pokemon foi encontrado
              </Typography>
            )}
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
