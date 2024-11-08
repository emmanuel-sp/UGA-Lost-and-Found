"use client"
import { useRouter } from 'next/navigation';

export default function Contact() {

  const router = useRouter();

  return (
    <div>
      <h2>Welcome to the Contact Page!</h2>
      <button onClick={() => router.push('./landing')}>Go to Landing</button>
      <button onClick={() => router.push('./login')}>Go to Login</button>
    </div>
  );
};
