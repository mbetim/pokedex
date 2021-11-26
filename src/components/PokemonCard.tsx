import React, { useState } from "react";
import Image from "next/image";
// Material ui
import { Box, IconButton, Typography } from "@mui/material";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as HeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as HeartRegular } from "@fortawesome/free-regular-svg-icons";
// Utils
import { Pokemon } from "types/Pokemon";
import { colors } from "constants/colors";

interface PokemonCardProps {
  pokemon: Pokemon;
  isFavorite: boolean;
  onClick: () => void;
}

const pokemonSpriteSize = 150;

const PokemonTypeChip = ({ type }: { type: string }) => (
  <Typography
    variant="caption"
    color={colors.white}
    bgcolor={colors[type as keyof typeof colors]}
    sx={{ mr: 1, px: 1.5, py: 0.2, borderRadius: 2 }}
  >
    {type}
  </Typography>
);

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, isFavorite, onClick }) => {
  // States
  const [isMouseOver, setIsMouseOver] = useState(false);

  return (
    <Box
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      onClick={onClick}
      sx={{ cursor: "pointer" }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: pokemonSpriteSize,
          height: pokemonSpriteSize,
          borderRadius: 2,
        }}
      >
        <Image alt={pokemon.name} src={pokemon.sprites.large} layout="fill" objectFit="contain" />

        <Box sx={{ position: "absolute", top: 2, right: 2 }}>
          {isMouseOver && !isFavorite && <FontAwesomeIcon icon={HeartRegular} color={colors.red} />}

          {isFavorite && <FontAwesomeIcon icon={HeartSolid} color={colors.red} />}
        </Box>
      </Box>

      <Typography variant="subtitle2" color={colors.lightGray} sx={{ mt: 1.5 }}>
        <strong>Nº {pokemon.national_number}</strong>
      </Typography>

      <Typography variant="h6" gutterBottom>
        <strong>{pokemon.name}</strong>
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {pokemon.type.map((type) => (
          <PokemonTypeChip key={type} type={type} />
        ))}
      </Box>
    </Box>
  );
};
