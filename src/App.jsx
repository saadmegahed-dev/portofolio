import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Home from "./pages/Home";

import { ColorModeContext, useThemeMode } from "./theme/theme";

function App() {
  const { theme, colorMode } = useThemeMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Home />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;