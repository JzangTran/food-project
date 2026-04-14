import type { OrderStatus, Role } from "../../types";

type Props = { status?: OrderStatus; role?: Role; available?: boolean };

export default function StatusBadge({ status, role, available }: Props) {
  if (typeof available === "boolean") {
    return (
      <span className={`inline-flex border-2 border-black px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] ${available ? "bg-[#F0C020] text-black" : "bg-white text-black/70"}`}>
        {available ? "DANG BAN" : "AN"}
      </span>
    );
  }

  if (role) {
    return (
      <span className={`inline-flex border-2 border-black px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] ${role === "ADMIN" ? "bg-[#1040C0] text-white" : "bg-[#D02020] text-white"}`}>
        {role}
      </span>
    );
  }

  const map: Record<OrderStatus, string> = {
    CHO_XAC_NHAN: "bg-white text-black",
    DANG_CHUAN_BI: "bg-[#F0C020] text-black",
    DANG_GIAO: "bg-[#1040C0] text-white",
    DA_GIAO: "bg-[#D02020] text-white",
  };

  return <span className={`inline-flex border-2 border-black px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] ${status ? map[status] : "bg-white text-black"}`}>{status?.replaceAll("_", " ")}</span>;
}
