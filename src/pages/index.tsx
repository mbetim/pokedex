import type { NextPage } from "next";
// Material ui
import { Container } from "@mui/material";
// Components
import { Header } from "components/Header";
import { ListPokemons } from "components/ListPokemons";

const Home: NextPage = () => {
  return (
    <main>
      <Header />

      <Container sx={{ my: 3 }}>
        <ListPokemons />
      </Container>
    </main>
  );
};

export default Home;
