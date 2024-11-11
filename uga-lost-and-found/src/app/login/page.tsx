"use client"

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import style from '../css/Login.module.css'

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setLoggedIn } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    setLoggedIn(true);
    router.push('/items');
  };

  const cancelLogin = () => {
    router.push('/items');
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }
  
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  return (
    <div className={style.login}>
      <h2 className={style.title}>Welcome Back!</h2>
      <form className={style.form}>
        <input className={style.input}
          type="text" 
          placeholder="Username" 
          onChange={handleUsernameChange} 
          value={username}
        />
        <input className={style.input}
          type="text" 
          placeholder="Password" 
          onChange={handlePasswordChange} 
          value={password}
        />
        <button type="submit" onClick={handleLogin}>Login</button>
      </form>
      <button className={style.signup}>Don't have an account? Sign Up!</button>
      <button className={style.cancel} onClick={cancelLogin}>Continue without logging in</button>
      
    </div>
  );
  
};
