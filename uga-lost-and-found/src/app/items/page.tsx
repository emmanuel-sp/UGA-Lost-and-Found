"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Search from "../components/Search";
import ItemCard from "../components/ItemCard";
import style from "../css/Items.module.css";
import itemstyle from "../css/ItemCard.module.css";
import { doLogout } from "../actions";
import { getSession } from 'next-auth/react';

export default function Items() {
//const Items: React.FC = async () => {
  
  const router = useRouter();
  const [items, setItems] = useState([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/items");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setItems(data.items);
      } catch (error) {
        console.log("Error from Item List:", error);
      }
      await getSession();
    
    };
    fetchItems();
  }, []);

  const onDeleteClick = async (id: string) => {
    try {
      const response = await fetch(`/api/items/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setItems((prevItems) => prevItems.filter((item: any) => item._id !== id)); // Remove the deleted item from state
    } catch (error) {
      console.log("Error in ShowItemDetails_deleteClick:", error);
    }
  };
  //onClick={() => setLoggedIn(false)}
  return (
    <>
      {session?.user ? (
        <nav className={style.AuthNavBar}>
          <h2 className={style.name}>UGA Lost & Found</h2>
          <Search />
          <button onClick={() => router.push("/form")} className={style.navButton}>
            Add Item
          </button>
          <button onClick={async ()=> {
            
            await doLogout()
            
            //window.location.reload();
            
            router.push('/')
            }}className={style.navButton}>
            Logout
          </button>
          
        </nav>
      ) : (
        <nav className={style.UnauthNavBar}>
          <h2 className={style.name}>UGA Lost & Found</h2>
          <Search />
          <button onClick={() => router.push("/login")} className={style.navButton}>
            Login/Signup
          </button>
        </nav>
      )}

      <section className={itemstyle.itemList}>
        {items.length > 0 ? (
          items.map((item: any) => (
            <div key={item._id} className={itemstyle.itemCardContainer}>
              <ItemCard
                name={item.name}
                dateFound={item.dateFound}
                locationFound={item.locationFound}
                imageUrl={item.imageUrl}
                status={item.status as "Claimed" | "Unclaimed"}
                onDelete={() => onDeleteClick(item._id)} // Pass the delete handler
                onEdit={() => router.push(`edit-items/${item._id}`)}
              />
            </div>
          ))
        ) : (
          <p>No items found.</p>
        )}
      </section>
    </>
  );
}

//export default Items;
