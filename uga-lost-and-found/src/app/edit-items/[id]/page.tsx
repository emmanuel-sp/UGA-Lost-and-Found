"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import style from '@/app/css/Form.module.css'

type FormData = {
  name: string;
  dateFound: string;
  locationFound: string;
  status?: "Claimed" | "Unclaimed";
  imageUrl: string;
};

export default function EditForm() {

  const router = useRouter();
  const params = useParams();
  const id  = params?.id;

  const [newData, setUpdateData] = useState<FormData>({
    name: '',
    dateFound: '',
    locationFound: '',
    status: 'Unclaimed',  // Initializes first as unclaimed
    imageUrl: '',
  });//Accepts new user data as state data.

  // This is the Get Item code to fetch for data.
  useEffect(() => {
    const fetchItem = async () => {
        try {
            const response = await fetch(`/api/items/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            
            setUpdateData({
              name: data.item.name || "",
              dateFound: data.item.dateFound || "",
              locationFound: data.item.locationFound || "",
              status: data.item.status || "Unclaimed",
              imageUrl: data.item.imageUrl || "",
            });

        } catch (error) {
            console.log('Error from ShowItemDetails');
        }
    };

    if (id) {
        fetchItem();
    } 
  }, [id]);  // Fetches for Item data - Get request


  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {id, value} = event.target;
    setUpdateData(prevData => ({...prevData, [id]: value, }));
  }; // Handler that updates the Form

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();  

     // This is the Put(update) Item to update data of this item
        try {   
            const response = await fetch(`/api/items/${id}`, 
              {
                method: "PUT",
                body: JSON.stringify(newData),
              }
            );
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
        } catch (error) {
            console.log('Error from UpdateItemInfo');
        } // This is the PUT request to update a new item!

    //router.refresh();
    router.push('../items');  // Returns to the items page

  }; // Handle Submit to update Item
  
  return (
    <div className={style.entireForm}>
      <h1 className="text-4xl font-bold mb-6 text-center">Edit Item Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className={style.label}>Item Name</label>
        <input className={style.input}
          id="name"
          type="text"
          placeholder="Enter your name"
          // Added this:
          value={newData.name}
          onChange={handleChange}

        />
        <label htmlFor="dateFound" className={style.label}>Date Found</label>
        <input className={style.input}
          id="dateFound"
          type="text"
          placeholder="Enter the date found"
          //Added this:
          value={newData.dateFound}
          onChange={handleChange}
        />
        <label htmlFor="locationFound" className={style.label} >Location Found</label>
        <input className={style.input}
          id="locationFound"
          type="text"
          placeholder="Enter the location it is found"
          // Added this:
          value={newData.locationFound}
          onChange={handleChange}
        />
        <label htmlFor="status" className={style.label}>Status</label>
        <select className={style.input}
          id="status"
          //type="status"
          //placeholder="Enter its status Unclaimed or Claimed"
          // Added this:
          value={newData.status}
          //onChange={handleChange}
          onChange={(event) => handleChange(event as ChangeEvent<HTMLSelectElement>)}
        >
          <option value="Unclaimed">Unclaimed</option>
          <option value="Claimed">Claimed</option>
          </select>
        <label htmlFor="imageUrl" className={style.label}>Image Link</label>
        <input className={style.input}
          id="imageUrl"
          type="url"
          placeholder="Enter image URL"
          // Added this:
          value={newData.imageUrl}
          onChange={handleChange}
        />
        <button type="submit" className={style.label}>Edit Item</button>
      </form>
    </div>
  );
}
  