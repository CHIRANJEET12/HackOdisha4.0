import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import '../css/PaymentForm.css';
import { useNavigate } from 'react-router-dom';

export const PaymentConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { productID, amount } = location.state || {};

  const [formData, setFormData] = useState({
    transactionId: '',
    amountPaid: amount || '',
    paymentTime: '',
    productID: productID || '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log('Form submitted:', formData);
      
      // Send the data to your backend
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/orders/create-order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {
          console.log('Order created successfully:', data);
          navigate('/Delivery-confirmation');
        } else {
          console.error('Error creating order:', data.message);
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.transactionId) errors.transactionId = 'Transaction ID is required';
    if (!data.amountPaid || isNaN(data.amountPaid)) errors.amountPaid = 'Valid amount is required';
    if (!data.paymentTime) errors.paymentTime = 'Payment time is required';
    return errors;
  };

  return (
    <div className="form-container">
      <h2>Payment Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="transactionId">Transaction ID</label>
          <input
            type="text"
            id="transactionId"
            name="transactionId"
            value={formData.transactionId}
            onChange={handleChange}
            className={errors.transactionId ? 'error' : ''}
          />
          {errors.transactionId && <span className="error-text">{errors.transactionId}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="amountPaid">Amount Paid</label>
          <input
            type="number"
            id="amountPaid"
            name="amountPaid"
            value={formData.amountPaid}
            onChange={handleChange}
            className={errors.amountPaid ? 'error' : ''}
            disabled
          />
          {errors.amountPaid && <span className="error-text">{errors.amountPaid}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="productID">Product ID</label>
          <input
            type="text"
            id="productID"
            name="productID"
            value={formData.productID}
            readOnly
            className="read-only"
          />
        </div>

        <div className="form-field">
          <label htmlFor="paymentTime">Payment Time</label>
          <input
            type="time"
            id="paymentTime"
            name="paymentTime"
            value={formData.paymentTime}
            onChange={handleChange}
            className={errors.paymentTime ? 'error' : ''}
          />
          {errors.paymentTime && <span className="error-text">{errors.paymentTime}</span>}
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default PaymentConfirmation;
