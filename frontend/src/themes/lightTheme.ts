import "@fontsource/roboto";
import createTheme from "@mui/material/styles/createTheme";

import headerBackground from "~assets/header-bg-small.png";

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
      default: "#e5edff",
    },
  },
  typography: (palette) => ({
    fontFamily,
    allVariants: {
      fontFamily,
    },
    categoryAnswer: {
      fontSize: "2vw",
      fontWeight: "bold",
      lineHeight: 1,
      color: palette.secondary.main,
      textShadow: "2px 2px black",
    },
    categoryName: {
      fontSize: 18,
      fontWeight: "bold",
      color: "white",
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
      variants: [
        {
          props: { variant: "navBar" },
          style: ({ theme }) => ({
            backgroundColor: theme.palette.primary.main,
            ":hover": {
              backgroundColor: theme.palette.primary.dark,
              boxShadow: `0 0 5px 2px ${theme.palette.secondary.main}`,
            },
          }),
        },
        {
          props: { variant: "navBarIcon" },
          style: ({ theme }) => ({
            backgroundColor: theme.palette.primary.main,
            borderRadius: "100%",
            minWidth: 0,
            padding: 6,
            ":hover": {
              backgroundColor: theme.palette.primary.dark,
              boxShadow: `0 0 5px 2px ${theme.palette.secondary.main}`,
            },
          }),
        },
      ],
    },
    MuiToolbar: {
      styleOverrides: {
        root: ({ theme }) => ({
          flexDirection: "column",
          justifyContent: "space-around",
          height: 200,
          backgroundImage: `url("${headerBackground}")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          "& .nav-bar-logo": {
            userSelect: "none",
          },
          "& > .nav-bar-button-row": {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: `min(100%, ${theme.breakpoints.values.lg}px)`,
          },
          "& .nav-bar-button-group": {
            flexDirection: "row",
            alignItems: "center",
            gap: theme.spacing(1),
          },
        }),
      },
    },
  },
});
