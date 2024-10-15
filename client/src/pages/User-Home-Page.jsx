import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export const UserHomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [searchPrice, setSearchPrice] = useState('');

  const handlePostClick = () => {
    navigate('/create-post'); // Adjust the route as needed
  };

  // Fetch products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from localStorage
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setProducts(response.data); // Set the products in state
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products.'); // Set error message if fetch fails
      } finally {
        setLoading(false); // Stop loading state
      }
    };

    fetchProducts(); // Call the function to fetch products
  }, []); // Empty dependency array to run once on mount

  // Filter products based on search criteria
  const filteredProducts = products.filter(product => {
    const isNameMatch = product.name.toLowerCase().includes(searchName.toLowerCase());
    const isPriceMatch = searchPrice ? product.price <= Number(searchPrice) : true;
    return isNameMatch && isPriceMatch;
  });

  // Function to handle interested button click
  const handleInterestedClick = async (product) => {
    const token = localStorage.getItem('token'); // Get token from localStorage
    const senderId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
    const receiverId = product.seller; // Get the userId of the person who posted the product
    const productId = product._id; // Access the product ID

    if (!senderId || !receiverId) {
      console.error('Sender ID or Receiver ID is missing.');
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/send-request`, // Adjust endpoint as needed
        {
          senderId,
          receiverId,
          productId,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      console.log('Interest request sent:', response.data);
      alert('Interest request sent!'); // Alert the user on success
    } catch (err) {
      console.error('Error sending interest:', err);
      alert('Failed to send interest request.'); // Alert the user on failure
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('userId'); // Remove userId from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <div>
      <h1>User Home Page</h1>
      <button onClick={handleLogout} style={{ marginBottom: '20px' }}>
        Logout
      </button>
      <div>
        <FontAwesomeIcon 
          icon={faPen} 
          style={{ fontSize: '24px', cursor: 'pointer' }} 
          onClick={handlePostClick} 
        />
      </div>

      {/* Search Filters */}
      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)} // Update searchName on input change
          style={{ marginRight: '10px' }}
        />
        <input
          type="number"
          placeholder="Max price"
          value={searchPrice}
          onChange={(e) => setSearchPrice(e.target.value)} // Update searchPrice on input change
        />
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p className="text-danger">{error}</p>}
      <div>
        {filteredProducts.length > 0 ? (
          <ul>
            {filteredProducts.map(product => (
              <li key={product._id}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: ₹{product.price}</p>
                <p>Location: {product.location}</p>
                <p>Category: {product.category}</p>
                <p>Years Used: {product.yearsUsed}</p>
                <button onClick={() => handleInterestedClick(product)}>Interested</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};
