import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import GeometricLogo from "../common/GeometricLogo";

const navItems = [
  { label: "Menu", to: "/" },
  { label: "Orders", to: "/orders" },
  { label: "Login", to: "/login" },
  { label: "Register", to: "/register" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b-4 border-black bg-[#F0F0F0]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-4">
          <GeometricLogo />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-black/60">Mini Food Ordering</p>
            <p className="text-lg font-black uppercase tracking-tight sm:text-xl">Bauhaus Canteen</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-bold uppercase tracking-[0.25em] transition duration-200 ${
                  isActive ? "text-[#D02020]" : "text-black hover:text-[#D02020]"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="flex h-12 w-12 items-center justify-center border-2 border-black bg-white shadow-[4px_4px_0px_0px_black] md:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t-4 border-black bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className="border-2 border-black px-4 py-3 text-sm font-bold uppercase tracking-[0.25em] shadow-[4px_4px_0px_0px_black]"
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}