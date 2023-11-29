import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../AuthProvider";

import type { RouteRoleGuardProps } from "./RouteRoleGuard.types";

export default function RouteRoleGuard({ roles = [] }: RouteRoleGuardProps) {
  const { hasRole } = useAuth();

  if (hasRole(...roles)) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
}
