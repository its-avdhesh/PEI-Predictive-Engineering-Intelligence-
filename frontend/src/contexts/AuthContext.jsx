import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('pei_token') || Cookies.get('auth_token');
    if (token) {
      setIsAuthenticated(true);
      setUser({ name: 'John Doe', avatar: 'https://github.com/johndoe.png' });
    }
    setIsLoading(false);
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('pei_token', token);
    Cookies.set('auth_token', token, { expires: 7 }); // 7 days
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('pei_token');
    Cookies.remove('auth_token');
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
