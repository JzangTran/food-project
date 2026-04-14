import { LogOut } from "lucide-react";
import type { Role } from "../../types";

type Props = { role: Role };

export default function TopBar({ role }: Props) {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <div className="border-b-4 border-black bg-[#F0F0F0] px-4 py-4 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-black/60">SIGNED IN</p>
          <p className="text-lg font-black uppercase tracking-tight">{role}</p>
        </div>
        <button type="button" onClick={handleLogout} className="inline-flex items-center gap-2 border-2 border-black bg-white px-4 py-3 text-sm font-bold uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_black]">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}