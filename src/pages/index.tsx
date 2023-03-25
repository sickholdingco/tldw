import type { NextPage } from "next";
import Head from "next/head";
import { Footer } from "@/components/footer/Footer";
import VideoDisplay from "@/components/videoDisplay/videoDisplay";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>tl;dw</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="m-auto flex w-full max-w-7xl flex-1 flex-col px-16 py-2">
        <VideoDisplay />
      </main>
    </>
  );
};

export default Home;
