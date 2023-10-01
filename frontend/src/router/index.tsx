import { createBrowserRouter, Navigate } from "react-router-dom";

import App from "~app/App";
import { ManageGamesPage } from "~pages/admin/ManageGamesPage";
import { ManageQuestionsPage } from "~pages/admin/ManageQuestionsPage";
import { ErrorPage } from "~pages/general/ErrorPage";
import { HomePage } from "~pages/general/HomePage";
import { NotFoundPage } from "~pages/general/NotFoundPage";
import { SettingsPage } from "~pages/general/SettingsPage";
import { HistoryLandingPage } from "~pages/history/HistoryLandingPage";
import { ReviewGamePage } from "~pages/history/ReviewGamePage";
import { CreateGamePage } from "~pages/play/CreateGamePage";
import { JoinGamePage } from "~pages/play/JoinGamePage";
import { PlayGamePage } from "~pages/play/PlayGamePage";
import { PlayLandingPage } from "~pages/play/PlayLandingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "play",
            children: [
              {
                index: true,
                element: <PlayLandingPage />,
              },
              {
                path: "new",
                element: <CreateGamePage />,
              },
              {
                path: "join",
                element: <JoinGamePage />,
              },
              {
                path: ":gameId",
                element: <PlayGamePage />,
              },
            ],
          },
          {
            path: "history",
            children: [
              {
                index: true,
                element: <HistoryLandingPage />,
              },
              {
                path: ":gameId",
                element: <ReviewGamePage />,
              },
            ],
          },
          {
            path: "settings",
            element: <SettingsPage />,
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
                element: <ManageQuestionsPage />,
              },
              {
                path: "games",
                element: <ManageGamesPage />,
              },
            ],
          },
          {
            path: "*",
            element: <NotFoundPage />,
          },
        ],
      },
    ],
  },
]);
