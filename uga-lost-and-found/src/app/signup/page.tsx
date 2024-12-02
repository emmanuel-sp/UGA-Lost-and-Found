"use client"

import { useRouter } from 'next/navigation';
import { useState, ChangeEvent, FormEvent } from 'react';
import { POST } from '@/app/api/users/route';
import style from '../css/Login.module.css'

export default function Signup() {
  
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate inputs
    if (!formData.email || !formData.password) {
      setErrorMessage('Email and password are required');
      return;
    }

    try {
      console.log(JSON.stringify(formData));
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        setErrorMessage('User not found!');
        return;
      }

    } catch (error) {
      setErrorMessage('User not found!');
    }

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
    if (confirmPassword != event.target.value) setErrorMessage('Passwords must match!');
    else setErrorMessage('');
  }

  const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setConfirmPassword(event.target.value);
    if (formData.password != event.target.value) setErrorMessage('Passwords must match!');
    else setErrorMessage('');
  }

  const handleLoginInstead = () => {
    router.push('/login');
  }

  const cancelSignup = () => {
    router.push('/items');
  };

  return (
    <div className={style.login}>
      <h2 className={style.name}>UGA Lost & Found</h2>
      <div className={style['greet-log']}>
        <h2 className={style.greeting}>Create an account!</h2>
        <form className={style.form}>
          <input className={style.input}
            type="text" 
            placeholder="email" 
            onChange={handleEmailChange} 
            value={formData.email}
            required
          />
          <input className={style.input}
            type="password" 
            placeholder="Password" 
            onChange={handlePasswordChange}
            autoCapitalize='none'
            spellCheck="false"
            autoComplete='password'
            value={formData.password}
            required
          />
          <input className={style.input}
            type="password" 
            placeholder="Confirm password" 
            onChange={handleConfirmPasswordChange} 
            value={confirmPassword}
            spellCheck="false"
            autoCapitalize='none'
            required
          />
          {errorMessage == '' ? '' : <p className={style.error}>{errorMessage}</p>}
          <button disabled={errorMessage != ''} className={style['login-button']} type="submit" onClick={handleSignup}>Signup</button>
        </form>
      </div>
      <div className={style["alt-options"]}>
        <button onClick={handleLoginInstead} className={style.signup}>Already have an account? Login!</button>
        <span className={style.separator}> | </span>
        <button className={style.cancel} onClick={cancelSignup}>Continue without signing up</button>
      </div>
    </div>
  );
  
};