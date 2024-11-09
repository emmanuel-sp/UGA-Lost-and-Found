"use client"
import { useRouter } from 'next/navigation';
import style from '../../css/Items.module.css';
import Search from '../../components/Search';

export default function Items() {
  const router = useRouter();

  return (
    <>
      <nav className={style.navbar}>
        <h2 className={style.name}>UGA Lost & Found</h2>
        <Search/>
        <button onClick={() => router.push('./login')} className={style.button2}>Login/Signup</button>
      </nav> 
    </>
  );
};
