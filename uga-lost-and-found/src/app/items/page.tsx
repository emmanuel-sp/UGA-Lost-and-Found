"use client"
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Search from '../components/Search';
import ItemCard from '../components/ItemCard';
import style from '../css/Items.module.css';
import itemstyle from '../css/ItemCard.module.css';

const dummyItems = [
  { name: 'Water Bottle', dateFound: '11-01-2024 14:30', locationFound: 'UGA Main Library', imageUrl: 'https://target.scene7.com/is/image/Target/GUEST_d1cc925e-7052-4ef5-baff-a590b9778bc5?wid=1200&hei=1200&qlt=80&fmt=webp', status: 'Unclaimed' },
  { name: 'Laptop', dateFound: '11-03-2024 09:45', locationFound: 'Boyd Grad Rsch 0328', imageUrl:'https://cdn.thewirecutter.com/wp-content/media/2024/07/laptopsunder500-2048px-5452.jpg?auto=webp&quality=75&width=1024', status: 'Claimed' },
  { name: 'Red Bookbag', dateFound: '11-06-2024 06:45', locationFound: 'Boyd Grad Rsch 0202', status: 'Unclaimed' },
  { name: 'Green Pen', dateFound: '11-06-2024 06:45', locationFound: 'Boyd Grad Rsch 0202', status: 'Unclaimed' },
  { name: 'Red Pen', dateFound: '11-06-2024 06:45', locationFound: 'Boyd Grad Rsch 0202', status: 'Unclaimed' },
];

export default function Items() {
  const { loggedIn } = useAuth();
  const { setLoggedIn } = useAuth();
  const router = useRouter();

// I (Amir) added this code to test my code of adding a new item.

  return (
    <>
      {loggedIn ? (
        <nav className={style.AuthNavBar}>
          <h2 className={style.name}>UGA Lost & Found</h2>
          <Search/>
          <Link href="/form" className={style.linkButton}>
            Add Item
          </Link>
          <Link href="/" onClick={() => setLoggedIn(false)} className={style.linkButton}>
            Logout
          </Link>
        </nav>
      ) : (
        <nav className={style.UnauthNavBar}>
          <h2 className={style.name}>UGA Lost & Found</h2>
          <Search/>
          <button onClick={() => router.push('/login')} className={style.navButton}>Login/Signup</button>
        </nav>
      )}
      

      <section className={itemstyle.itemList}>
        {dummyItems.map((item, index) => (
          <div key={index} className={itemstyle.itemCardContainer}>
            <ItemCard
              name={item.name}
              dateFound={item.dateFound}
              locationFound={item.locationFound}
              imageUrl={item.imageUrl}
              status={item.status as "Claimed" | "Unclaimed"}
            />
          </div>
        ))}
      </section>
    </>
  );
};
