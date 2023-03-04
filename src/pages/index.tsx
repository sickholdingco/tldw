import type { NextPage } from "next";
import Head from "next/head";
import { Footer } from "../components/footer/Footer";
import { Search } from "../components/search/Search";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>tl;dw</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <Search />
      </main>

      <footer className="flex h-24 w-full items-center justify-center">
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
