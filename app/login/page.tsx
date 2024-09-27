"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: any, action: any) => {
    e.preventDefault();
    const response = await fetch(action === 'login' ? '/api/login' : '/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    console.log("Login Response: ", response.json)

    if (response.ok) {
      if (action === 'login') {
        console.log("Logged In!", {closeOnClick: true})
        router.push('/');
      }
    } else {
      console.error("Error logging in!", {closeOnClick: true})
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, "login")}>
      <label htmlFor="email">Email:</label>
      <input value={email} id="email" onChange={(e) => setEmail(e.target.value)} name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" required />
      <button type="submit">Log in</button>
    </form>
  )
}
