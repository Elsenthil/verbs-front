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

export default function SignIn({ handleLoginSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    handleLoginSubmit(formJson);
  };

  return (
    <Container maxWidth="xl">
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <InputLabel htmlFor="username">Identifiant</InputLabel>
          <Input id="username" name="username" aria-describedby="username" />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="password">Mot de passe</InputLabel>
          <Input
            id="password"
            name="password"
            type="password"
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
