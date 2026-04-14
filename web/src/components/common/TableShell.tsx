import type { ReactNode } from "react";

type Props = { children: ReactNode };

export default function TableShell({ children }: Props) {
  return <div className="overflow-hidden border-4 border-black bg-white shadow-[8px_8px_0px_0px_black]">{children}</div>;
}