import React, { useState } from 'react';
import { useDarkMode } from '../components/DarkModeContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/DeliveryForm.css';

export default function DeliveryForm() {
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    contactNumber: '',
    email: '',
    password: '',
    aadharNumber: '',
    panCard: '',
    photo: null,
    permanentAddress: '',
    currentAddress: '',
    proofOfAddress: null,
    vehicleType: '',
    vehicleRegNumber: '',
    drivingLicense: '',
    vehicleInsurance: '',
    bankAccountNumber: '',
    ifscCode: '',
    bankNameBranch: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    previousExperience: '',
    reference: '',
    policeClearance: null,
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/regDel`, formData);
      console.log('Response:', response.data);
      console.log('response: ', response.status);
      alert("success");

      if(response.status === 201){
        navigate('/Userhomepage');  
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error.response ? error.response.data : 'An error occurred'); 
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className={`form-container ${darkMode ? 'dark' : 'light'}`}>
      <form onSubmit={handleSubmit} className="responsive-form">
        <h2>Personal Information</h2>
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
        </div> */}
        <div className="form-group">
          <label htmlFor="contactNumber">Contact Number:</label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <h2>Identity Verification</h2>
        <div className="form-group">
          <label htmlFor="aadharNumber">Aadhar Number:</label>
          <input
            type="text"
            id="aadharNumber"
            name="aadharNumber"
            value={formData.aadharNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="panCard">PAN Card:</label>
          <input
            type="text"
            id="panCard"
            name="panCard"
            value={formData.panCard}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="photo">Passport-sized Photo:</label>
          <input
            type="file"
            id="photo"
            name="photo"
            onChange={handleChange}
            accept="image/*"
            required
          />
        </div>

        <h2>Address Information</h2>
        <div className="form-group">
          <label htmlFor="permanentAddress">Permanent Address:</label>
          <textarea
            id="permanentAddress"
            name="permanentAddress"
            value={formData.permanentAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="currentAddress">Current Address:</label>
          <textarea
            id="currentAddress"
            name="currentAddress"
            value={formData.currentAddress}
            onChange={handleChange}
          />
        </div>
        {/* <div className="form-group">
  <label htmlFor="proofOfAddress">Proof of Address:</label>
  <input
    type="file"
    id="proofOfAddress"
    name="proofOfAddress"
    onChange={handleChange}
    accept=".pdf,.jpg,.png"
    required
  />
  <small>Accepted formats: .pdf, .jpg, .png</small>
</div> */}


        <h2>Vehicle Details</h2>
        <div className="form-group">
          <label htmlFor="vehicleType">Vehicle Type:</label>
          <input
            type="text"
            id="vehicleType"
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="vehicleRegNumber">Vehicle Registration Number:</label>
          <input
            type="text"
            id="vehicleRegNumber"
            name="vehicleRegNumber"
            value={formData.vehicleRegNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="drivingLicense">Driving License Number:</label>
          <input
            type="text"
            id="drivingLicense"
            name="drivingLicense"
            value={formData.drivingLicense}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="vehicleInsurance">Vehicle Insurance Details:</label>
          <textarea
            id="vehicleInsurance"
            name="vehicleInsurance"
            value={formData.vehicleInsurance}
            onChange={handleChange}
          />
        </div>

        <h2>Bank Details</h2>
        <div className="form-group">
          <label htmlFor="bankAccountNumber">Bank Account Number:</label>
          <input
            type="text"
            id="bankAccountNumber"
            name="bankAccountNumber"
            value={formData.bankAccountNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ifscCode">IFSC Code:</label>
          <input
            type="text"
            id="ifscCode"
            name="ifscCode"
            value={formData.ifscCode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="bankNameBranch">Bank Name and Branch:</label>
          <input
            type="text"
            id="bankNameBranch"
            name="bankNameBranch"
            value={formData.bankNameBranch}
            onChange={handleChange}
            required
          />
        </div>

        <h2>Emergency Contact</h2>
        {/* <div className="form-group">
          <label htmlFor="emergencyContactName">Name and Relationship:</label>
          <input
            type="text"
            id="emergencyContactName"
            name="emergencyContactName"
            value={formData.emergencyContactName}
            onChange={handleChange}
          />
        </div> */}
        {/* <div className="form-group">
          <label htmlFor="emergencyContactNumber">Contact Number:</label>
          <input
            type="tel"
            id="emergencyContactNumber"
            name="emergencyContactNumber"
            value={formData.emergencyContactNumber}
            onChange={handleChange}
            required
          />
        </div> */}

        <h2>Employment History (Optional)</h2>
        <div className="form-group">
          <label htmlFor="previousExperience">Previous Experience as a Delivery Person:</label>
          <textarea
            id="previousExperience"
            name="previousExperience"
            value={formData.previousExperience}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="reference">Reference from Previous Employers:</label>
          <textarea
            id="reference"
            name="reference"
            value={formData.reference}
            onChange={handleChange}
          />
        </div>

        <h2>Background Verification</h2>
        <div className="form-group">
          <label htmlFor="policeClearance">Police Clearance Certificate:</label>
          <input
            type="file"
            id="policeClearance"
            name="policeClearance"
            onChange={handleChange}
            accept=".pdf,.jpg,.png"
          />
        </div>
        <div className="form-group checkbox-group">
          <label htmlFor="consent">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
            />
            Consent for Background Checks
          </label>
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>

        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}
