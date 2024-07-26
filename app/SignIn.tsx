"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  Input,
  TextField,
  Container,
  Button,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    login(username, password);
  };

  return (
    <Container maxWidth="xl">
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <InputLabel htmlFor="username">Identifiant</InputLabel>
          <Input
            id="username"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            aria-describedby="username"
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="password">Mot de passe</InputLabel>
          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            aria-describedby="password"
          />
        </FormControl>
        <Button type="submit" variant="contained">
          Connexion
        </Button>
      </form>
    </Container>
  );
}
