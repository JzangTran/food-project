import { NavLink } from "react-router-dom";
import GeometricLogo from "./GeometricLogo";

type Item = { label: string; to: string };

type Props = { title: string; subtitle: string; items: Item[] };

export default function SidebarNav({ title, subtitle, items }: Props) {
  return (
    <aside className="border-r-4 border-black bg-white p-4 lg:p-6">
      <div className="mb-8 flex items-center gap-4 border-2 border-black bg-[#F0F0F0] p-4 shadow-[4px_4px_0px_0px_black]">
        <GeometricLogo />
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-black/60">{subtitle}</p>
          <p className="text-lg font-black uppercase tracking-tight">{title}</p>
        </div>
      </div>

      <nav className="space-y-3">
        {items.map((item, index) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center justify-between border-2 border-black px-4 py-4 text-sm font-bold uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_black] transition duration-200 ${
                isActive ? "bg-[#D02020] text-white" : index % 2 === 0 ? "bg-white text-black" : "bg-[#F0C020] text-black"
              }`
            }
          >
            {item.label}
            <span className="h-4 w-4 border-2 border-black bg-[#1040C0]" />
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
