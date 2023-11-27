import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../AuthProvider";

export default function RouteAuthGuard() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Outlet />;
  }

  return <Navigate to="/landing" />;
}
