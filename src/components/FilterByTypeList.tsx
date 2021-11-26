import React from "react";
// Material ui
import { Chip, Box, Typography } from "@mui/material";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface FilterByTypeListProps {
  selectedTypes: string[];
  onChange: (newSelectedTypes: string[]) => void;
}

const types = [
  "Bug",
  "Dark",
  "Dragon",
  "Electric",
  "Fairy",
  "Fighter",
  "Fire",
  "Flying",
  "Ghost",
  "Grass",
  "Ground",
  "Ice",
  "Normal",
  "Poison",
  "Psychic",
  "Rock",
  "Steel",
  "Water",
];

export const FilterByTypeList: React.FC<FilterByTypeListProps> = ({ selectedTypes, onChange }) => {
  const handleOnClick = (type: string) => {
    if (selectedTypes.includes(type)) {
      onChange(selectedTypes.filter((t) => t !== type));
    } else {
      onChange([...selectedTypes, type]);
    }
  };

  return (
    <Box>
      <Typography variant="h6">Filtrar por tipo</Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {types.map((type) => (
          <Chip
            key={type}
            label={type}
            variant={selectedTypes.includes(type) ? "filled" : "outlined"}
            color="primary"
            onClick={() => handleOnClick(type)}
            onDelete={selectedTypes.includes(type) ? () => handleOnClick(type) : undefined}
            deleteIcon={
              selectedTypes.includes(type) ? (
                <FontAwesomeIcon icon={faCheck} style={{ fontSize: "16px" }} />
              ) : undefined
            }
            sx={{ mr: 1, mb: 1 }}
          />
        ))}
      </Box>
    </Box>
  );
};
