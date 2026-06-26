import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          text: {
            primary: "#000",
          },
          bg: {
            main: "#e4e4e471",
          },
          favColor: {
            main: grey[300],
          },
        }
      : {
          text: {
            primary: "#fff",
          },
          bg: {
            main: "#000",
          },
          favColor: {
            main: grey[800],
          },
        }),
  },
});

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useThemeMode = () => {
  const [mode, setMode] = useState("dark"); 

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () => createTheme(getDesignTokens(mode)),
    [mode]
  );

  return { theme, colorMode };
};