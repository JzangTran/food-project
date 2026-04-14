import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../lib/axios";

type RegisterRole = "USER" | "ADMIN";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: "USER" as RegisterRole,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    field: "fullName" | "email" | "phone" | "password" | "role",
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccessMessage("");

      const response = await api.post<ApiResponse<unknown>>("/auth/register", {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        password: form.password,
        role: form.role,
      });

      setSuccessMessage(response.data.message || "Dang ky thanh cong");

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1000);
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Dang ky that bai. Vui long thu lai.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F0F0F0] px-4 py-12">
      <div className="w-full max-w-xl border-4 border-black bg-[#F0C020] p-6 shadow-[8px_8px_0px_0px_black] lg:p-8">
        <div className="mb-8 space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-black/70">
            User Service
          </p>
          <h1 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter">
            Register
          </h1>
        </div>

        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >
          <input
            value={form.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className="w-full border-2 border-black bg-white px-4 py-3 outline-none"
            placeholder="Ho va ten"
          />

          <input
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full border-2 border-black bg-white px-4 py-3 outline-none"
            placeholder="Email"
          />

          <input
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full border-2 border-black bg-white px-4 py-3 outline-none"
            placeholder="So dien thoai"
          />

          <input
            type="password"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            className="w-full border-2 border-black bg-white px-4 py-3 outline-none"
            placeholder="Mat khau"
          />

          <select
            value={form.role}
            onChange={(e) => handleChange("role", e.target.value)}
            className="w-full border-2 border-black bg-white px-4 py-3 outline-none"
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>

          {error ? (
            <div className="border-2 border-black bg-white px-4 py-3 text-sm font-bold uppercase tracking-[0.15em] text-[#D02020]">
              {error}
            </div>
          ) : null}

          {successMessage ? (
            <div className="border-2 border-black bg-white px-4 py-3 text-sm font-bold uppercase tracking-[0.15em] text-[#1040C0]">
              {successMessage}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full border-2 border-black bg-[#1040C0] px-4 py-4 text-sm font-bold uppercase tracking-[0.25em] text-white shadow-[4px_4px_0px_0px_black] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-black/70">
          Da co tai khoan?{" "}
          <Link to="/login" className="text-[#D02020]">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}