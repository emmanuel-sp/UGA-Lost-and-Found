"use client";
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import style from '../css/Form.module.css'

type FormData = {
  name: string;
  dateFound: string;
  locationFound: string;
  status?: "Claimed" | "Unclaimed";
  imageUrl: string;
};

interface FormProps  {
  onAddItem: (newItem: FormData) => void;
};

export default function Form({ onAddItem }: FormProps) {

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

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
   
    onAddItem(formData);

    //Clear the input fields
    setFormData({
      name: '',
      dateFound: '',
      locationFound: '',
      status: 'Unclaimed',
      imageUrl: '',
    });
  }; // Handle Submit
  
  return (
    <div className={style.entireForm}>
      <h1 className="text-4xl font-bold mb-6 text-center">Add Item Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className={style.label}>Item Name</label>
        <input className={style.input}
          id="name"
          type="text"
          placeholder="Enter your name"
          // Added this:
          value={formData.name}
          onChange={handleChange}

        />
        <label htmlFor="dateFound" className={style.label}>Date Found</label>
        <input className={style.input}
          id="dateFound"
          type="text"
          placeholder="Enter the date found"
          //Added this:
          value={formData.dateFound}
          onChange={handleChange}
        />
        <label htmlFor="locationFound" className={style.label} >Location Found</label>
        <input className={style.input}
          id="locationFound"
          type="text"
          placeholder="Enter the location it is found"
          // Added this:
          value={formData.locationFound}
          onChange={handleChange}
        />
        <label htmlFor="status" className={style.label}>Status</label>
        <select className={style.input}
          id="status"
          //type="status"
          //placeholder="Enter its status Unclaimed or Claimed"
          // Added this:
          value={formData.status}
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
          value={formData.imageUrl}
          onChange={handleChange}
        />
        <button type="submit" className={style.label}>Add Item</button>
      </form>
    </div>
  );
}
  