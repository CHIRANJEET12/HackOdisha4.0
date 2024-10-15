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
  const [searchName, setSearchName] = useState(''); // State for name search
  const [searchPrice, setSearchPrice] = useState(''); // State for price search

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
            'Authorization': `Bearer ${token}`, // Include the token in the request headers
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
    const isPriceMatch = searchPrice ? product.price <= Number(searchPrice) : true; // Only filter by price if input is provided
    return isNameMatch && isPriceMatch;
  });

  return (
    <div>
      <h1>User Home Page</h1>
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
