import React, { createContext, useState, useContext, useEffect } from 'react';
// import authService from '../services/authService';

// Create AuthContext
export const AuthContext = createContext();

// Create a custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Create AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setUser(loggedInUser); // Set user state if found in local storage
    }
  }, []);

  const login = async (userData) => {
    setUser(userData); // Set user state upon login
    localStorage.setItem('loggedInUser', JSON.stringify(userData)); // Save to local storage
  };

  const logout = () => {
    setUser(null); // Clear user state
    localStorage.removeItem('loggedInUser'); // Clear local storage
  };

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
