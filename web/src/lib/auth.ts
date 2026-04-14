export type Role = "ADMIN" | "USER";

export type AuthData = {
  accessToken: string;
  role: Role;
  userId?: string;
  fullName?: string;
  email?: string;
  phone?: string;
};

const AUTH_EVENT = "auth-changed";

export function getStoredAuth() {
  return {
    accessToken: localStorage.getItem("accessToken"),
    role: localStorage.getItem("role") as Role | null,
  };
}

export function saveAuth(data: AuthData) {
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("role", data.role);

  if (data.userId) localStorage.setItem("userId", data.userId);
  if (data.fullName) localStorage.setItem("fullName", data.fullName);
  if (data.email) localStorage.setItem("email", data.email);
  if (data.phone) localStorage.setItem("phone", data.phone);

  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function clearAuth() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("role");
  localStorage.removeItem("userId");
  localStorage.removeItem("fullName");
  localStorage.removeItem("email");
  localStorage.removeItem("phone");

  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function subscribeAuthChange(callback: () => void) {
  window.addEventListener(AUTH_EVENT, callback);
  return () => window.removeEventListener(AUTH_EVENT, callback);
}