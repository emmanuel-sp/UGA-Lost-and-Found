'use client'

import { useRouter } from 'next/navigation';
import { useState, ChangeEvent, FormEvent } from 'react';
import { doCredentialLogin } from '../actions/index';
import style from '../css/Login.module.css'


export default function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async (event: React.FormEvent) => {
    console.log("handling login")
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    await doCredentialLogin(formData);
    console.log("calling doCredentialLogin")

    router.push('/items');
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      email: event.target.value,
    }));
  }
  
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      password: event.target.value,
    }));
  }

  const cancelLogin = () => {
    router.push('/items');
  };

  const handleSignupInstead = () => {
    router.push('/signup');
  }

  return (
    <div className={style.login}>
      <h2 className={style.name}>UGA Lost & Found</h2>
      <div className={style["greet-log"]}>
        <h2 className={style.greeting}>Welcome Back!</h2>
        <form className={style.form} onSubmit={handleLogin}>
          <input className={style.input}
            type="text" 
            placeholder="Email" 
            onChange={handleEmailChange} 
            value={formData.email}
            required
          />
          <input className={style.input}
            type="password" 
            placeholder="Password" 
            onChange={handlePasswordChange} 
            value={formData.password}
            required
          />
          <button className={style['login-button']} type="submit">Login</button>
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
