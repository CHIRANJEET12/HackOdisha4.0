// components/UserContext.js
import React, { createContext, useContext, useState } from 'react';

// Create UserContext
const UserContext = createContext();

// UserContext provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to hold user data

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use UserContext
export const useUserContext = () => {
  return useContext(UserContext);
};
