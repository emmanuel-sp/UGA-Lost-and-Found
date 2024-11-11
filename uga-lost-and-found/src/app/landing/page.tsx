"use client"
import style from '../css/Landing.module.css'

import {useRouter } from 'next/navigation';

export default function Landing() {
  const router = useRouter();

  return (
    <div className={style.landing}>
      <h1 className={style.mainTitle}>UGA Lost & Found</h1>

      <button className={style.startFindBtn} 
              onClick={() => router.push('/items')}>Start Finding</button>
              
      <button className={style.loginBtn} 
              onClick={() => router.push('/login')}>Login / Signup</button>
    </div>
  );
};