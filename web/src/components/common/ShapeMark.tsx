import type { ShapeType } from "../../types";

type Props = { shape?: ShapeType; className?: string };

export default function ShapeMark({ shape = "circle", className = "" }: Props) {
  if (shape === "square") return <div className={`h-4 w-4 border-2 border-black bg-[#1040C0] ${className}`} />;
  if (shape === "triangle") {
    return <div className={`h-0 w-0 border-l-[10px] border-r-[10px] border-b-[18px] border-l-transparent border-r-transparent border-b-[#F0C020] ${className}`} />;
  }
  return <div className={`h-4 w-4 rounded-full border-2 border-black bg-[#D02020] ${className}`} />;
}