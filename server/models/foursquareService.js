const API_KEY = 'fsq3PqXDRuopgpm52LRbrkIS1Gak7ex7kFLzmxJ6hcYk6HA';  

if (!API_KEY) {
  throw new Error("Foursquare API key is missing.");
}

export const getNearbyShops = async (latitude, longitude, radius) => {
  const url = `https://api.foursquare.com/v3/places/search?ll=${latitude},${longitude}&radius=${radius}&query=bookstore`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,  // Correct format for Foursquare API
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results;  // Return list of nearby shops
  } catch (error) {
    console.error('Error fetching nearby shops:', error);
    throw error;
  }
};

