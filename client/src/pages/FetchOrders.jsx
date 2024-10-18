import React, { useEffect, useState } from 'react';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/fetch-orders`); // Adjust the URL based on your server setup
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data); // Store the orders in state
      } catch (err) {
        setError(err.message); // Capture any error messages
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchOrders(); // Call the function to fetch orders
  }, []);

  // Render loading state
  if (loading) return <p>Loading orders...</p>;

  // Render error state
  if (error) return <p>Error: {error}</p>;

  // Render order details
  return (
    <div>
      <h2>Order Details</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <p>Product ID: {order.productID}</p>
              <p>Buyer Phone: {order.buyer?.phone}</p>
              <p>Seller Phone: {order.seller?.phone}</p>
              <p>Pickup Address: {order.pickupAddress}</p>
              <p>Delivery Address: {order.deliveryAddress}</p>
              <p>Delivery Status: {order.deliveryStatus}</p>
              <p>Delivery Boy: {order.deliveryBoy}</p>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderList;
