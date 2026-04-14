import { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminFoodsPage from "./pages/admin/AdminFoodsPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import UserLayout from "./layouts/UserLayout";
import UserFoodsPage from "./pages/user/UserFoodPage";
import UserCartPage from "./pages/user/UserCartPage";
import UserOrdersPage from "./pages/user/UserOrderPage";
import AdminLayout from "./layouts/AdminLayout";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import { getStoredAuth, subscribeAuthChange } from "./lib/auth";

export default function App() {
  const [auth, setAuth] = useState(getStoredAuth());

  useEffect(() => {
    const unsubscribe = subscribeAuthChange(() => {
      setAuth(getStoredAuth());
    });

    return unsubscribe;
  }, []);

  const isAuthenticated = Boolean(auth.accessToken);
  const role = auth.role;

  const defaultPath = useMemo(() => {
    if (isAuthenticated && role === "ADMIN") return "/admin/foods";
    if (isAuthenticated) return "/user/foods";
    return "/login";
  }, [isAuthenticated, role]);

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to={defaultPath} replace /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to={defaultPath} replace /> : <RegisterPage />}
      />

      <Route
        element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            allowedRoles={["USER"]}
            currentRole={role}
          />
        }
      >
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<Navigate to="foods" replace />} />
          <Route path="foods" element={<UserFoodsPage />} />
          <Route path="cart" element={<UserCartPage />} />
          <Route path="orders" element={<UserOrdersPage />} />
        </Route>
      </Route>

      <Route
        element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            allowedRoles={["ADMIN"]}
            currentRole={role}
          />
        }
      >
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="foods" replace />} />
          <Route path="foods" element={<AdminFoodsPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={defaultPath} replace />} />
    </Routes>
  );
}