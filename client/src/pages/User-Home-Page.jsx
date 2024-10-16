import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../components/DarkModeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import "../css/UserHomePage.css"

export const UserHomePage = () => {
  const { darkMode } = useDarkMode();
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

  // Function to navigate to product details
  const handleInterestedClick = (product) => {
    navigate(`/product/${product._id}`); // Navigate to product details page
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('userId'); // Remove userId from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="homepage-container">
      <h1>User Home Page</h1>
      <button className={darkMode ? 'dark-mode-button' : 'light-mode-button'} onClick={handleLogout} style={{ marginBottom: '20px' }}>
        Logout
      </button>
      <div className="create-post-icon">
        <FontAwesomeIcon 
          icon={faPen} 
          style={{ fontSize: '24px', cursor: 'pointer' }} 
          onClick={handlePostClick} 
        />
      </div>

      {/* Search Filters */}
      <div className="search-filters" style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)} // Update searchName on input change
          style={{ marginRight: '10px' }}
          className="search-input"
        />
        <input
          type="number"
          placeholder="Max price"
          value={searchPrice}
          onChange={(e) => setSearchPrice(e.target.value)} // Update searchPrice on input change
          className="search-input"
        />
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p className="text-danger">{error}</p>}
      <div>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product._id} className="blog-post">
              <h2 className="post-title">{product.name}</h2>
              <p className="post-description">{product.description}</p>
              <div className="post-details">
                <span className="post-price">Price: ₹{product.price}</span>
                <span className="post-location">Location: {product.location}</span>
                <span className="post-category">Category: {product.category}</span>
                <span className="post-years-used">Years Used: {product.yearsUsed}</span>
                <button 
                  className={darkMode ? 'dark-mode-button' : 'light-mode-button'}
                  onClick={() => handleInterestedClick(product)}>
                  Interested
                </button>
                </div>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};
