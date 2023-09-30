import "@fontsource/roboto";
import { createTheme } from "@mui/material";

const fontFamily = "'Roboto', 'Helvetica', 'Arial', sans-serif";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
  typography: () => ({
    fontFamily,
    allVariants: {
      fontFamily,
    },
  }),
});
