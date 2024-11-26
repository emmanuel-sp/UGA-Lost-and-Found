"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Search from "../components/Search";
import ItemCard from "../components/ItemCard";
import style from "../css/Items.module.css";
import itemstyle from "../css/ItemCard.module.css";
import { useEffect, useState } from "react";

export default function Items() {
  const { loggedIn } = useAuth();
  const { setLoggedIn } = useAuth();
  const router = useRouter();

  const [items, setItems] = useState([]);

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

  return (
    <>
      {loggedIn ? (
        <nav className={style.AuthNavBar}>
          <h2 className={style.name}>UGA Lost & Found</h2>
          <Search />
          <button onClick={() => router.push("/form")} className={style.navButton}>
            Add Item
          </button>
          <button onClick={() => setLoggedIn(false)} className={style.navButton}>
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
