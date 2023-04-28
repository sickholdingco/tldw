import type { NextPage } from "next";
import Head from "next/head";
import SummaryView from "@/components/summary/SummaryView";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>tl;dw</title>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔍</text></svg>" />
      </Head>

      <main className="m-auto flex w-full max-w-[90rem] flex-1 flex-col px-8 py-6">
        <SummaryView />
      </main>
    </>
  );
};

export default Home;
