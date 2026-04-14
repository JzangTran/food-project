import type { ShapeType } from "../../types";
import ShapeMark from "../common/ShapeMark";

export default function StatsBand() {
  const stats = [
    { label: "MON AN", value: "24+", shape: "circle" as ShapeType },
    { label: "DON HOM NAY", value: "68", shape: "square" as ShapeType },
    { label: "THANH TOAN", value: "2", shape: "triangle" as ShapeType },
    { label: "THOI GIAN", value: "15M", shape: "square" as ShapeType },
  ];

  return (
    <section className="border-b-4 border-black bg-[#F0C020]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y-4 divide-black sm:grid-cols-2 sm:divide-x-4 sm:divide-y-0 lg:grid-cols-4">
        {stats.map((item, index) => (
          <div key={item.label} className="flex items-center justify-between gap-4 px-5 py-6 lg:px-8 lg:py-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-black/70">{item.label}</p>
              <p className="mt-2 text-4xl font-black uppercase leading-none tracking-tighter text-black lg:text-5xl">
                {item.value}
              </p>
            </div>
            <div className={index % 3 === 2 ? "rotate-45" : ""}>
              <ShapeMark shape={item.shape} className="scale-150" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
