// Foursquare API credentials
import env from "dotenv"
const API_KEY = process.env.REACT_APP_FOURSQUARE_API_KEY;  // Replace this with your actual Foursquare API key

// Function to search for nearby shops (e.g., bookstores)
export const getNearbyShops = async (latitude, longitude) => {
  const url = `https://api.foursquare.com/v3/places/search?ll=${latitude},${longitude}&query=bookstore`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': API_KEY,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.results;  // Return list of nearby shops
  } catch (error) {
    console.error('Error fetching nearby shops:', error);
    throw error;
  }
};
