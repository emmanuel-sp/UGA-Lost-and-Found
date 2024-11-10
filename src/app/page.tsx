"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  // link google fonts
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com"/>
    <link href="https://fonts.googleapis.com/css2?family=League+Gothic&display=swap" rel="stylesheet"></link>
  </head>

  const router = useRouter();

  useEffect(() => {
    router.push('./pages/landing');
  }, [router]); 
  
  return (
    <div>
      <h1>Redirecting...</h1>
    </div>
  );
};