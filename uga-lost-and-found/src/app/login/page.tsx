"use client"

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import style from '../css/Login.module.css'

export default function Login() {
  
  const { setLoggedIn } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    setLoggedIn(true);
    router.push('/items');
  };

  const cancelLogin = () => {
    router.push('/items');
  };

  return (
    <div className={style.login}>
      <h2 className={style.loginPrompt}>Welcome to the Login Page!</h2>
      <button onClick={handleLogin}>Login</button>
      <button onClick={cancelLogin}>Continue without logging in</button>
    </div>
  );
};
