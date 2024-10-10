import React, { useState, useEffect } from 'react';
import { getNearbyShops } from '../../../server/models/foursquareService'; 

const NearbyShops = () => {
  const [shops, setShops] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
      } else {
        setError('Geolocation is not supported by this browser.');
        setLoading(false);
      }
    };

    const success = async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const radius = 5000; // 5 kilometers

      try {
        const shopData = await getNearbyShops(latitude, longitude, radius); // Call the API function
        setShops(shopData); // Set the fetched shops in the state
        setLoading(false);
      } catch (err) {
        setError('Error fetching shops');
        setLoading(false);
      }
    };

    const error = (err) => {
      setError(`Error: ${err.message}`);
      setLoading(false);
    };

    getUserLocation();
  }, []);

  if (loading) {
    return <div>Loading nearby shops...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Nearby Shops (within 5 km):</h2>
      <ul>
        {shops.length > 0 ? (
          shops.map((shop, index) => <li key={index}>{shop.name}</li>)
        ) : (
          <li>No shops found in the specified range.</li>
        )}
      </ul>
    </div>
  );
};

export default NearbyShops;
