"use client"

import { useRouter } from 'next/navigation'; // Import from next/router
import { useEffect } from 'react';
import { AppProps } from 'next/app';
import { AuthProvider } from './context/AuthContext';
import Head from 'next/head'; // Import next/head

export default function Home({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // Redirect logic should work properly now
    router.push('/landing'); // Correct path to navigate
  }, [router]);

  return (
    <>
      <Head>
        {/* Linking Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=League+Gothic&display=swap"
          rel="stylesheet"
        />
      </Head>
      <h1>Redirecting...</h1>
    </>
  );
}
