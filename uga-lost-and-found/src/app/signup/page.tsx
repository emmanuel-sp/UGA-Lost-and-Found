"use client"

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState, ChangeEvent, FormEvent } from 'react';
import style from '../css/Login.module.css'

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
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

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUsername(event.target.value);
  }
  
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPassword(event.target.value);
    if (event.target.value != confirmPassword) setErrorMessage(true);
    else setErrorMessage(false);
  }

  const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setConfirmPassword(event.target.value);
    if (password != event.target.value) setErrorMessage(true);
    else setErrorMessage(false);
  }

  const handleLoginInstead = () => {
    router.push('/login');
  }

  return (
    <div className={style.login}>
      <h2 className={style.name}>UGA Lost & Found</h2>
      <div className={style['greet-log']}>
        <h2 className={style.greeting}>Create an account!</h2>
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
          <input className={style.input}
            type="password" 
            placeholder="Confirm password" 
            onChange={handleConfirmPasswordChange} 
            value={confirmPassword}
            autoComplete="username"
            spellCheck="false"
            autoCapitalize='none'
            required
          />
          {errorMessage && <h2 className={style.error}>*Passwords must match!*</h2>}
          <button disabled={errorMessage} className={style['login-button']} type="submit" onClick={handleLogin}>Signup</button>
        </form>
      </div>
      <div className={style["alt-options"]}>
        <button onClick={handleLoginInstead} className={style.signup}>Already have an account? Login!</button>
        <span className={style.separator}> | </span>
        <button className={style.cancel} onClick={cancelLogin}>Continue without signing up</button>
      </div>
    </div>
  );
  
};
