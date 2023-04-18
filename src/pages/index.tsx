import type { NextPage } from "next";
import Head from "next/head";
import SummaryView from "@/components/summary/SummaryView";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>tl;dw</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="m-auto flex w-full max-w-[90rem] flex-1 flex-col px-8 py-6">
        <SummaryView />
      </main>
    </>
  );
};

export default Home;
