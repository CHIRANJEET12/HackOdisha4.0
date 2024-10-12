import React, { useState } from 'react';
import { useDarkMode } from '../components/DarkModeContext';
import '../css/BuyerForm.css';


export default function SellerForm() {

  const { darkMode } = useDarkMode();
  const [address, setAddress] = useState(''); // Stores the user's input

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted', { address });
  };
  return (
    <div className={`form-container ${darkMode ? 'dark' : 'light'}`}>
    <form onSubmit={handleSubmit} className="responsive-form">
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" placeholder="Enter your name" required />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="Enter your Email" required />
      </div>

      <div className="form-group">
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Enter your address"
          value={address}
          onChange={handleAddressChange}
          className="location-input"
          required
        />
      </div>

      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  </div>
  )
}
