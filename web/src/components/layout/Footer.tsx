import { ShoppingCart } from "lucide-react";
import GeometricLogo from "../common/GeometricLogo";

type Props = {
  totalItems?: number;
};

export default function Footer({ totalItems = 0 }: Props) {
  return (
    <footer className="bg-[#121212] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <GeometricLogo />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-white/70">React + Tailwind v4</p>
            <p className="text-lg font-black uppercase tracking-tight">Bauhaus Ordering UI</p>
          </div>
        </div>

        <div className="inline-flex items-center gap-3 border-2 border-white px-4 py-3 text-xs font-bold uppercase tracking-[0.3em] text-white">
          <ShoppingCart className="h-4 w-4" />
          {totalItems} Items Selected
        </div>
      </div>
    </footer>
  );
}