import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import api from "../lib/axios";
import { saveAuth } from "../lib/auth";

type LoginResponseData = {
  token: string;
  userId: number;
  fullName: string;
  email: string;
  phone: string;
  role: "ADMIN" | "USER";
};

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname?: string } })?.from?.pathname;

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field: "email" | "password", value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.post<ApiResponse<LoginResponseData>>("/auth/login", {
        email: form.email,
        password: form.password,
      });

      const payload = response.data.data;

      saveAuth({
        accessToken: payload.token,
        role: payload.role,
        userId: String(payload.userId),
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone,
      });

      navigate(from || (payload.role === "ADMIN" ? "/admin/foods" : "/user/foods"), {
        replace: true,
      });
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Dang nhap that bai. Vui long thu lai.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F0F0F0] px-4 py-12">
      <div className="w-full max-w-xl border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_black] lg:p-8">
        <div className="mb-8 space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-black/60">
            User Service
          </p>
          <h1 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter">
            Login
          </h1>
        </div>

        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.3em]">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full border-2 border-black bg-[#F0F0F0] px-4 py-3 outline-none"
              placeholder="employee@company.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.3em]">
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="w-full border-2 border-black bg-[#F0F0F0] px-4 py-3 outline-none"
              placeholder="••••••••"
            />
          </div>

          {error ? (
            <div className="border-2 border-black bg-[#F0C020] px-4 py-3 text-sm font-bold uppercase tracking-[0.15em] text-black">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full border-2 border-black bg-[#D02020] px-4 py-4 text-sm font-bold uppercase tracking-[0.25em] text-white shadow-[4px_4px_0px_0px_black] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-black/70">
          Chua co tai khoan?{" "}
          <Link to="/register" className="text-[#1040C0]">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}