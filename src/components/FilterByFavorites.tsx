import React from "react";
// Material ui
import { Switch, SwitchProps, Typography } from "@mui/material";

interface FilterByFavoritesProps extends SwitchProps {}

export const FilterByFavorites: React.FC<FilterByFavoritesProps> = (props) => {
  return (
    <div>
      <Typography variant="h6">Filtrar Favoritos</Typography>

      <Switch {...props} />
    </div>
  );
};
