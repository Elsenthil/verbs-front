"use client";

import ResponsiveAppBar from "./components/ui/ResponsiveAppBar";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { frFR } from "@mui/material/locale";

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
      <ResponsiveAppBar></ResponsiveAppBar>
      <main>{children}</main>
      <footer>
        <h3>Footer</h3>
      </footer>
    </ThemeProvider>
  );
}
