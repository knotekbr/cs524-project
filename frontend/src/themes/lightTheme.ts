import "@fontsource/roboto";
import createTheme from "@mui/material/styles/createTheme";

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
  components: {
    MuiAppBar: {
      defaultProps: {
        position: "static",
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          justifyContent: "space-between",
        },
      },
    },
  },
});
