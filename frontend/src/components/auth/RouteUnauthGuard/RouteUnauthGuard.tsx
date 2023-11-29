import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../AuthProvider";

export default function RouteUnauthGuard() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
