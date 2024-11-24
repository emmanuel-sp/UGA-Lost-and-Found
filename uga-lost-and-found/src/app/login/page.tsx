"use client"

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState, ChangeEvent, FormEvent } from 'react';
import style from '../css/Login.module.css'

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setLoggedIn } = useAuth();
  const router = useRouter();

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();
    setLoggedIn(true);
    router.push('/items');
  };

  const cancelLogin = () => {
    router.push('/items');
  };

  const handleSignupInstead = () => {
    router.push('/signup');
  }

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUsername(event.target.value);
  }
  
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPassword(event.target.value);
  }

  return (
    <div className={style.login}>
      <h2 className={style.name}>UGA Lost & Found</h2>
      <div className={style["greet-log"]}>
        <h2 className={style.greeting}>Welcome Back!</h2>
        <form className={style.form}>
          <input className={style.input}
            type="text" 
            placeholder="Username" 
            onChange={handleUsernameChange} 
            value={username}
            required
          />
          <input className={style.input}
            type="password" 
            placeholder="Password" 
            onChange={handlePasswordChange} 
            value={password}
            required
          />
          <button className={style['login-button']} type="submit" onClick={handleLogin}>Login</button>
        </form>
      </div>
      <div className={style["alt-options"]}>
        <button onClick={handleSignupInstead} className={style.signup}>Don't have an account? Sign Up!</button>
        <span className={style.separator}> | </span>
        <button className={style.cancel} onClick={cancelLogin}>Continue without logging in</button>
      </div>
    </div>
  );
  
};
