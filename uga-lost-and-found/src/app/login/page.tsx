'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import style from '../css/Login.module.css';

export default function Login() {
  const router = useRouter();
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Fetch CSRF token on component mount
  useEffect(() => {
    const fetchCsrfToken = async () => {
      const response = await fetch('/api/auth/csrf');
      const data = await response.json();
      setCsrfToken(data.csrfToken);
    };
    fetchCsrfToken();
  }, []);

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
      const response = await fetch('/api/auth/callback/credentials', {
        method: 'POST',
        body: JSON.stringify({
          csrfToken,
          email: formData.email,
          password: formData.password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || 'Login failed. Please check your credentials.');
        return;
      }

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
