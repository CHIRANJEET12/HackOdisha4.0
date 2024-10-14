import React, { useState } from 'react';
import { useDarkMode } from '../components/DarkModeContext'; 
import '../css/Dashboard.css';

const Dashboard = () => {
  const { darkMode } = useDarkMode();
  const [openSections, setOpenSections] = useState({});
  
  // State to hold data for login/security and sales/transactions
  const [loginData, setLoginData] = useState({
    username: 'user123',
    email: 'user@example.com',
    phoneNumber: '123-456-7890',
    password: 'password123',
  });

  const [salesData, setSalesData] = useState({
    soldBooks: 5,
    salesEarnings: 150,
    salesHistory: ['Book 1', 'Book 2', 'Book 3'],
  });

  // State to manage which item is being edited
  const [editing, setEditing] = useState({ section: null, key: null, value: '' });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleEdit = (section, key, value) => {
    setEditing({ section, key, value });
  };

  const handleChange = (e) => {
    setEditing((prev) => ({ ...prev, value: e.target.value }));
  };

  const handleSave = () => {
    if (editing.section === 'loginAndSecurity') {
      setLoginData((prev) => ({ ...prev, [editing.key]: editing.value }));
    } else if (editing.section === 'salesAndTransactions' && editing.key in salesData) {
      setSalesData((prev) => ({ ...prev, [editing.key]: editing.value }));
    }
    setEditing({ section: null, key: null, value: '' }); // Reset editing state
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditing({ section: null, key: null, value: '' }); // Reset on escape
    }
  };

  const sections = [
    {
      key: 'loginAndSecurity',
      title: 'Login and Security',
      items: [
        { label: 'Username', value: loginData.username, editable: true, key: 'username' },
        { label: 'Email', value: loginData.email, editable: true, key: 'email' },
        { label: 'Phone Number', value: loginData.phoneNumber, editable: true, key: 'phoneNumber' },
        { label: 'Change Password', value: loginData.password, editable: true, key: 'password' },
      ],
    },
    {
      key: 'salesAndTransactions',
      title: 'Sales & Transactions',
      items: [
        { label: 'Sold Books', value: salesData.soldBooks, editable: false, key: 'soldBooks' },
        { label: 'Sales Earnings', value: salesData.salesEarnings, editable: false, key: 'salesEarnings' },
        { label: 'Sales History', value: salesData.salesHistory.join(', '), editable: false },
      ],
    },
    {
      key: 'notifications',
      title: 'Notifications',
      items: [
        { label: 'New Book Release', editable: false },
        { label: 'Order Update', editable: false },
        { label: 'Promotions', editable: false },
      ],
    },
    {
      key: 'supportAndHelp',
      title: 'Support and Help',
      items: [
        { label: 'FAQs', editable: false },
        { label: 'Contact Support', editable: false },
        { label: 'How to Sell Guide', editable: false },
      ],
    },
  ];

  return (
    <div className={`dashboard-container ${darkMode ? 'dark' : ''}`}>
      <div className="welcome-message">Welcome {loginData.username}!</div>
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
        </div>
        <div className="dashboard-content">
          {sections.map((section) => (
            <div
              key={section.key}
              className={`dashboard-section ${openSections[section.key] ? 'open' : ''}`}
            >
              <div
                className="section-header"
                onClick={() => toggleSection(section.key)}
              >
                <h2>{section.title}</h2>
                <span className={`arrow ${openSections[section.key] ? 'open' : ''}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-caret-down-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-.753.352z" />
                  </svg>
                </span>
              </div>
              {openSections[section.key] && (
                <div className="section-content">
                  <ul>
                    {section.items.map((item, idx) => (
                      <li key={idx}>
                        <span>{item.label}: </span>
                        {item.editable && editing.section === section.key && editing.key === item.key ? (
                          <>
                            <input
                              type="text"
                              value={editing.value}
                              onChange={handleChange}
                              onBlur={handleSave} // Save on blur
                              onKeyDown={handleKeyDown}
                              placeholder={`Enter ${item.label}`}
                            />
                            <button className={darkMode ? 'dark-mode-button' : 'light-mode-button'} onClick={handleSave}>Save</button>
                          </>
                        ) : (
                          <span>{item.value}</span>
                        )}
                        {item.editable && !(editing.section === section.key && editing.key === item.key) && ( // Show Edit button if not currently editing
                          <button className={darkMode ? 'dark-mode-button' : 'light-mode-button'} onClick={() => handleEdit(section.key, item.key, item.value)}>
                            Edit
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
