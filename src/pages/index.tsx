import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Hello world</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1>Hello world</h1>
      </div>
    </div>
  );
};

export default Home;
