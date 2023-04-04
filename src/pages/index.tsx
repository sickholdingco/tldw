import type { NextPage } from "next";
import Head from "next/head";
import VideoDisplay from "@/components/videoDisplay/videoDisplay";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>tl;dw</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="m-auto flex w-full max-w-[90rem] flex-1 flex-col px-4 py-2">
        <VideoDisplay />
      </main>
    </>
  );
};

export default Home;
