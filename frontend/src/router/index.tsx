import Typography from "@mui/material/Typography";

import { createBrowserRouter, Navigate } from "react-router-dom";

import App from "~app/App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        errorElement: <Typography>Error</Typography>,
        children: [
          {
            index: true,
            element: <Typography>Home</Typography>,
          },
          {
            path: "play",
            element: <Typography>Play Game</Typography>,
          },
          {
            path: "history",
            element: <Typography>Game History</Typography>,
          },
          {
            path: "settings",
            element: <Typography>Settings</Typography>,
          },
          {
            path: "admin",
            children: [
              {
                index: true,
                element: <Navigate to="questions" />,
              },
              {
                path: "questions",
                element: <Typography>Admin - Question Management</Typography>,
              },
              {
                path: "games",
                element: <Typography>Admin - Game Management</Typography>,
              },
            ],
          },
          {
            path: "*",
            element: <Typography>Page not found</Typography>,
          },
        ],
      },
    ],
  },
]);
