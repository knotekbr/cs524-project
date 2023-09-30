import "@fontsource/roboto";
import createTheme from "@mui/material/styles/createTheme";

const fontFamily = "'Roboto', 'Helvetica', 'Arial', sans-serif";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#071277",
    },
    secondary: {
      main: "#d69f4c",
    },
    background: {
      default: "#F5F5F5",
    },
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
        variant: "contained",
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
