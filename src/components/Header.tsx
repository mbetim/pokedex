import React from "react";
import Image from "next/image";
import { AppBar, Box, Container, IconButton, Toolbar, Typography } from "@mui/material";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const pokeballImageSize = 50;
const synviaImageSize = 35;

export const Header: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Container sx={{ display: "flex", justifyContent: "space-between", py: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Image
                alt="Pokeball"
                src="/pokeball.svg"
                width={pokeballImageSize}
                height={pokeballImageSize}
              />

              <Typography variant="h4" sx={{ ml: 2 }}>
                <strong>Pokédex</strong>
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Image
                alt="Pokeball"
                src="/synvia-A.svg"
                width={synviaImageSize}
                height={synviaImageSize}
              />

              <IconButton color="inherit" size="small" sx={{ ml: 1 }}>
                <FontAwesomeIcon icon={faSignOutAlt} />
              </IconButton>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
