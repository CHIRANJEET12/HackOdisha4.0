import { useState } from 'react';
import axios from 'axios'; // Import Axios
import '../css/PaymentForm.css'; // Create this CSS file for styling

export const PaymentConfirmatiom = () => {
  const [formData, setFormData] = useState({
    transactionId: '',
    amountPaid: '',
    paymentTime: '',
  });

  const [errors, setErrors] = useState({});
  const [submissionMessage, setSubmissionMessage] = useState('');

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
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/confirmation-payment`, formData); // Send data to the backend route
        setSubmissionMessage('Payment submitted successfully!');
        console.log('Form submitted:', response.data);
      } catch (error) {
        console.error('Error submitting the form:', error);
        setSubmissionMessage('Error submitting payment');
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
      {submissionMessage && <p className="submission-message">{submissionMessage}</p>} {/* Display submission message */}
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
          {errors.transactionId && (
            <span className="error-text">{errors.transactionId}</span>
          )}
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
          />
          {errors.amountPaid && (
            <span className="error-text">{errors.amountPaid}</span>
          )}
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
          {errors.paymentTime && (
            <span className="error-text">{errors.paymentTime}</span>
          )}
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default PaymentConfirmatiom;
