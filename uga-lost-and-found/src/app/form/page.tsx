"use client";
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import style from '../css/Form.module.css'

type FormData = {
  name: string;
  dateFound: Date | string;
  locationFound: string;
  status?: "Claimed" | "Unclaimed";
  imageUrl: string;
};

export default function Form() {

  const router = useRouter();
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    dateFound: '',
    locationFound: '',
    status: 'Unclaimed',  // Initializes first as unclaimed
    imageUrl: '',
  });//Accepts new user data as state data.

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {id, value} = event.target;
    setFormData(prevData => ({...prevData, [id]: value, }));
  }; // Handler that updates the Form

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      alert(JSON.stringify(formData));
      const response = await fetch(`/api/items`, 
        {
          method: "POST",
          body: JSON.stringify(formData),
        }
      )
      if (!response.ok) {
        const errorMessage = await response.json()
        console.log(errorMessage);
      }
    } catch (err) {
      console.log("Unknown trouble adding item!")
    }
    router.push('./items');  // Returns to the items page
  }; // Handle Submit
  
  return (
    <div className={style.entireForm}>
      <h1 className="text-4xl font-bold mb-6 text-center">Add Item Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className={style.label}>Item Name</label>
        <input className={style.input}
          id="name"
          type="text"
          placeholder="Describe this item"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="dateFound" className={style.label}>Date Found</label>
        <input className={style.input}
          id="dateFound"
          type="date"
          placeholder="When did you find this item?"
          value={formData.dateFound as string}
          onChange={handleChange}
          required
        />
        <label htmlFor="locationFound" className={style.label} >Location Found</label>
        <input className={style.input}
          id="locationFound"
          type="text"
          placeholder="Where did you find this item?"
          value={formData.locationFound}
          onChange={handleChange}
          required
        />
        <label htmlFor="status" className={style.label}>Status</label>
        <select className={style.input}
          id="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="Unclaimed">Unclaimed</option>
          <option value="Claimed">Claimed</option>
          </select>
        <label htmlFor="imageUrl" className={style.label}>Image Link</label>
        <input className={style.input}
          id="imageUrl"
          type="url"
          placeholder="Upload an image of this item (paste url)"
          value={formData.imageUrl}
          onChange={handleChange}
        />
        <button type="submit" className={style.label}>Add Item</button>
      </form>
    </div>
  );
}
  