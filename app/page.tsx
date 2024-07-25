"use client";

import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Home() {
  const auth = useContext(AuthContext);
  return (
    <>
      <h1>Home</h1>
      <p>{auth}</p>
    </>
  );
}
