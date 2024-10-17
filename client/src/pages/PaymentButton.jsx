import  { useState } from 'react';
import '../css/PaymentButton.css'
import { useNavigate } from 'react-router-dom';

export const PaymentButton = ({ sellerId, amount }) => {
  const [showQRCode, setShowQRCode] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Replace this with the URL of your static QR code image
  const qrCodeImageUrl = '../GooglePay_QR.png';

  const handlePayClick = () => {
    // Display the QR code image when the user clicks "Generate QR Code"
    setError(null);

    // Display the QR code by setting the state to true
    setShowQRCode(true);
  };


  const handlenextpage = () => {
    navigate('/confirmation-payment')
  }


  return (
    <div >
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
        <p
         style={{ fontWeight: 'bold'}}
   
>Amount to be paid:{amount}</p>

<button style={{'padding': '10px 20px',}} onClick={handlenextpage}> Fill the form to confirm payment</button>
        </div>
      )}
    </div>
  );
};
