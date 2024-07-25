"use client";
import * as React from "react";
import { useState, useEffect, useContext } from "react";

import ResponsiveAppBar from "../components/ui/ResponsiveAppBar";
import SignIn from "./SignIn";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { frFR } from "@mui/material/locale";
import { login, logout, isLogged, getToken } from "../utils/auth";
import { AuthProvider } from "../contexts/AuthContext";

const theme = createTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
    },
  },
  frFR
);

export default function App({ children }) {
  const [user, setUser] = useState(null);
  const [isloggedIn, setIsLoggedIn] = useState(isLogged);

  const handleLoginSubmit = (json) => {
    console.log(json);
    const user = login(json.username, json.password);
    user.then((data) => {
      console.log(data);
      data.success && setIsLoggedIn(true);
      data.success && setUser(data.user);
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <ResponsiveAppBar />
        {isloggedIn ? (
          <main>{children}</main>
        ) : (
          <SignIn handleLoginSubmit={handleLoginSubmit}></SignIn>
        )}
      </AuthProvider>
    </ThemeProvider>
  );
}
