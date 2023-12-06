import { createBrowserRouter, Navigate } from "react-router-dom";

import App from "~app/App";
import { RouteAuthGuard } from "~components/auth/RouteAuthGuard";
import { RouteRoleGuard } from "~components/auth/RouteRoleGuard";
import { RouteUnauthGuard } from "~components/auth/RouteUnauthGuard";
import { AdminBasePage } from "~pages/admin/AdminBasePage";
import { ManageGamesPage } from "~pages/admin/ManageGamesPage";
import { ManageQuestionsPage } from "~pages/admin/ManageQuestionsPage";
import { LogInPage } from "~pages/auth/LogInPage";
import { SignUpPage } from "~pages/auth/SignUpPage";
import { ErrorPage } from "~pages/general/ErrorPage";
import { HomePage } from "~pages/general/HomePage";
import { NotFoundPage } from "~pages/general/NotFoundPage";
import { SettingsPage } from "~pages/general/SettingsPage";
import { HistoryLandingPage } from "~pages/history/HistoryLandingPage";
import { ReviewGamePage } from "~pages/history/ReviewGamePage";
import { CreateGamePage } from "~pages/play/CreateGamePage";
import { JoinGamePage } from "~pages/play/JoinGamePage";
import { PlayBasePage } from "~pages/play/PlayBasePage";
import { PlayGamePage } from "~pages/play/PlayGamePage";

export const router = createBrowserRouter(
  [
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

            // Must be unauthenticated to access these routes
            {
              element: <RouteUnauthGuard />,
              children: [
                {
                  path: "login",
                  element: <LogInPage />,
                },
                {
                  path: "signup",
                  element: <SignUpPage />,
                },
              ],
            },

            // Must be authenticated to access these routes
            {
              element: <RouteAuthGuard />,
              children: [
                {
                  path: "play",
                  element: <PlayBasePage />,
                  children: [
                    {
                      index: true,
                      element: <Navigate to="new" />,
                    },
                    {
                      path: "new",
                      element: <CreateGamePage />,
                    },
                    {
                      path: "join",
                      element: <JoinGamePage />,
                    },
                  ],
                },
                {
                  path: "play/:gameId",
                  element: <PlayGamePage />,
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
              ],
            },

            // Must be an admin to access these routes
            {
              element: <RouteRoleGuard roles={["admin"]} />,
              children: [
                {
                  path: "admin",
                  element: <AdminBasePage />,
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
  ],
  { basename: "/cs524" }
);
