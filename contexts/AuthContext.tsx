"use client";

import { useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("user");

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
