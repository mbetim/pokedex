import React from "react";
// Material ui
import { Box, MenuItem, Select, SelectProps, Typography } from "@mui/material";
// Utils
import { colors } from "constants/colors";

export type OrderByValue = "national_number:asc" | "nation_number:desc" | "name:asc" | "name:desc";

interface SelectOrderByProps extends Omit<SelectProps, "onChange"> {
  onChange: (newOrderValue: OrderByValue) => void;
}

export const SelectOrderBy: React.FC<SelectOrderByProps> = ({ onChange, ...props }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: ["center", "end"], alignItems: "center" }}>
      <Typography variant="h6" sx={{ mr: 1 }}>
        Ordenar por
      </Typography>

      <Select
        size="small"
        color="primary"
        sx={{ height: 45, borderRadius: 8, "& fieldset": { borderColor: colors.red } }}
        {...props}
        onChange={(event) => onChange(event.target.value as OrderByValue)}
      >
        <MenuItem value="national_number:asc">Menor número primeiro</MenuItem>
        <MenuItem value="national_number:desc">Maior número primeiro</MenuItem>

        <MenuItem value="name:asc">Ordem alfabética</MenuItem>
        <MenuItem value="name:desc">Ordem alfabética-invertida</MenuItem>
      </Select>
    </Box>
  );
};
