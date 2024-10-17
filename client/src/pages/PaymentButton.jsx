import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/PaymentButton.css';

export const PaymentButton = ({ sellerId, amount, productID }) => {
  const [showQRCode, setShowQRCode] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Replace this with the URL of your static QR code image
  const qrCodeImageUrl = '../GooglePay_QR.png';

  const handlePayClick = () => {
    setError(null);
    setShowQRCode(true); // Display the QR code when the user clicks the button
  };

  const handleNextPage = () => {
    // Navigate to the payment confirmation page and pass the data
    navigate('/confirmation-payment', {
      state: { sellerId, amount, productID },
    });
  };

  return (
    <div>
      <button
        onClick={handlePayClick}
        className="pay-button"
        style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px' }}
      >
        Generate QR Code
      </button>
      {error && <p className="error-text">{error}</p>}
      {showQRCode && (
        <div>
          <p>Scan this QR code to pay:</p>
          <img
            src={qrCodeImageUrl}
            alt="UPI Payment QR Code"
            style={{ width: '200px', height: '200px' }}
          />
          <p style={{ fontWeight: 'bold' }}>
            Product ID: {productID} <br />
            Amount to be paid: {amount}
          </p>
          <button
            style={{ padding: '10px 20px' }}
            onClick={handleNextPage}
          >
            Fill the form to confirm payment
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentButton;
