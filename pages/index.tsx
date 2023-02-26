import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Footer } from '../components/footer/Footer'
import { Search } from '../components/search/Search'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col py-2">
      <Head>
        <title>tldw</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col px-20 py-12 text-center">
        <div className="flex w-full justify-center">
          <Search />
        </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center">
        <Footer />
      </footer>
    </div>
  )
}

export default Home
