import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '@/components/Header'
import { AuthProvider } from '@/context/AuthContext'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <Head>
          <title>iTec - FURG</title>
        </Head>
        <Header />
        <main className="pt-[4rem] md:pt-[5rem] min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <Component {...pageProps} />
          </div>
        </main>
      </AuthProvider>
    </>
  );
}
