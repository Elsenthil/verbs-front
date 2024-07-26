import React, { createContext, useState, useEffect, useContext } from "react";
import {
  login as loginUser,
  logout as logoutUser,
  isLogged,
  getToken,
} from "../utils/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(isLogged);

  useEffect(() => {
    if (isLoggedIn) {
      // Fetch user data if necessary
      const token = getToken();
      // Fetch user data with the token, e.g., from an endpoint like /me
      // setUser(userData);
    }
  }, [isLoggedIn]);

  const login = async (username, password) => {
    const response = await loginUser(username, password);
    if (response.success) {
      setIsLoggedIn(true);
      setUser(response.user);
    }
    return response;
  };

  const logout = () => {
    logoutUser();
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
