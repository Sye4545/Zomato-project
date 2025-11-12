import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = localStorage.getItem('zomatoUsers');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  const signup = (userData) => {
    const newUsers = [...users, userData];
    setUsers(newUsers);
    localStorage.setItem('zomatoUsers', JSON.stringify(newUsers));
  };

  const login = (emailOrPhone, password) => {
    const user = users.find(u => (u.email === emailOrPhone || u.phone === emailOrPhone) && u.password === password);
    if (user) {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
