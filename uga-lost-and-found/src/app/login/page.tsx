'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import style from '../css/Login.module.css';
import { doCredentialLogin } from '../actions';

export default function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    try {
      "use server"
      const response = await doCredentialLogin(formData);
      "use client"
      if (!response) {
        alert('Login failed. Please check your credentials.');
        return;
      }
      //window.location.reload()
      router.push('/items'); // Redirect on successful login
      
    } catch (error) {
      console.error('Login error:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  const cancelLogin = () => router.push('/items');

  const handleSignupInstead = () => router.push('/signup');

  return (
    <div className={style.login}>
      <h2 className={style.name}>UGA Lost & Found</h2>
      <div className={style['greet-log']}>
        <h2 className={style.greeting}>Welcome Back!</h2>
        <form className={style.form} onSubmit={handleLogin}>
          <input
            className={style.input}
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className={style.input}
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button className={style['login-button']} type="submit">
            Login
          </button>
        </form>
      </div>
      <div className={style['alt-options']}>
        <button onClick={handleSignupInstead} className={style.signup}>
          Don't have an account? Sign Up!
        </button>
        <span className={style.separator}> | </span>
        <button className={style.cancel} onClick={cancelLogin}>
          Continue without logging in
        </button>
      </div>
    </div>
  );
}
