import type { NextPage } from "next";
import Head from "next/head";
import { Footer } from "@/components/footer/Footer";
import VideoDisplay from "@/components/videoDisplay/videoDisplay";

const Home: NextPage = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center py-2 ">
      <Head>
        <title>tl;dw</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col px-20">
        <VideoDisplay />
      </main>

      {/* <footer className="flex h-24 w-full items-center justify-center">
        <Footer />
      </footer> */}
    </div>
  );
};

export default Home;
