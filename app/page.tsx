"use client";
import { Button } from "@mui/material";

import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <>
      <h1>Home</h1>
      {isLoggedIn && (
        <Button onClick={logout} variant="text">
          Déconnexion
        </Button>
      )}
    </>
  );
}
