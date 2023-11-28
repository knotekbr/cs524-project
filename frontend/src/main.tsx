import React from "react";
import ReactDOM from "react-dom/client";

import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import { FeedbackProvider } from "~components/utility/FeedbackProvider";
import { router } from "~router";
import { persistor, store } from "~state/store";
import { lightTheme } from "~themes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <FeedbackProvider>
            <RouterProvider router={router} />
          </FeedbackProvider>
        </ThemeProvider>
      </PersistGate>
    </ReduxProvider>
  </React.StrictMode>
);
