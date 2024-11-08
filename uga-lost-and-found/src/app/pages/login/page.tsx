"use client"
import style from '../../css/Login.module.css'

import { useRouter } from 'next/navigation';

export default function Login() {

  const router = useRouter();

  return (
    <div className={style.login}>
      <h2 className={style.loginPrompt}>Welcome to the Login Page!</h2>
      <button onClick={() => router.push('./landing')}>Login</button>
      <button onClick={() => router.push('./contact')}>Continue without logging in</button>
    </div>
  );
};
