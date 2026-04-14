import { Navigate, Outlet, useLocation } from "react-router-dom";

type Role = "ADMIN" | "USER" | null;

type ProtectedRouteProps = {
  isAuthenticated: boolean;
  currentRole: Role;
  allowedRoles?: Exclude<Role, null>[];
  redirectTo?: string;
};

export default function ProtectedRoute({
  isAuthenticated,
  currentRole,
  allowedRoles,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  if (allowedRoles && (!currentRole || !allowedRoles.includes(currentRole))) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}