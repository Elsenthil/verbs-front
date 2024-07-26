"use client";
import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { frFR } from "@mui/material/locale";
import { createTheme } from "@mui/material/styles";

import { AuthProvider, useAuth } from "../contexts/AuthContext";

import ResponsiveAppBar from "../components/ui/ResponsiveAppBar";
import SignIn from "./SignIn";

const theme = createTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
    },
  },
  frFR
);

export default function App({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <AuthConsumer>{children}</AuthConsumer>
      </AuthProvider>
    </ThemeProvider>
  );
}

const AuthConsumer = ({ children }) => {
  const { isLoggedIn } = useAuth();

  //Construire le design globale de l'état connecté ici
  const app = (
    <>
      <ResponsiveAppBar />
      <main>{children}</main>
    </>
  );

  return isLoggedIn ? app : <SignIn />; //Si pas de connexion détectée, on affiche le form sign in
};
