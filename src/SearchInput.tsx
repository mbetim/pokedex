import React, { useRef } from "react";
import { Box, InputBase, InputBaseProps } from "@mui/material";
import { colors } from "constants/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

type SearchInputProps = InputBaseProps;

export const SearchInput: React.FC<SearchInputProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        bgcolor: colors.lightGray,
        borderRadius: 8,
        px: 2,
        py: 1,
      }}
    >
      <InputBase
        ref={inputRef}
        placeholder="Pesquisar por nome ou número"
        size="small"
        fullWidth
        {...props}
      />

      <FontAwesomeIcon
        icon={faSearch}
        color={colors.red}
        onClick={() => inputRef.current?.click()}
        style={{ cursor: "pointer" }}
      />
    </Box>
  );
};
