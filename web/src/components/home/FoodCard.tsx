import { ArrowRight } from "lucide-react";
import { currency } from "../../lib/utils";
import type { FoodItem } from "../../types";
import ShapeMark from "../common/ShapeMark";

type Props = {
  food: FoodItem;
  onAdd: (food: FoodItem) => void;
};

export default function FoodCard({ food, onAdd }: Props) {
  return (
    <article className="group relative flex h-full flex-col justify-between border-2 border-black bg-white p-5 shadow-[6px_6px_0px_0px_black] transition duration-200 ease-out hover:-translate-y-1 lg:border-4 lg:p-6 lg:shadow-[8px_8px_0px_0px_black]">
      <div className="absolute right-4 top-4">
        <ShapeMark shape={food.shape} />
      </div>

      <div className="space-y-5 pr-8">
        <div className={`inline-flex border-2 border-black px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] ${food.accent} ${food.accent === "bg-[#F0C020]" ? "text-black" : "text-white"}`}>
          MENU ITEM
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-black uppercase leading-none tracking-tight text-black sm:text-3xl">
            {food.name}
          </h3>
          <p className="text-sm font-medium uppercase leading-relaxed tracking-wide text-black/75 sm:text-base">
            {food.description}
          </p>
        </div>
      </div>

      <div className="mt-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-black/60">Gia</p>
          <p className="text-xl font-black uppercase tracking-tight text-black sm:text-2xl">{currency(food.price)}</p>
        </div>

        <button
          type="button"
          onClick={() => onAdd(food)}
          className="inline-flex items-center gap-2 border-2 border-black bg-[#D02020] px-4 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-[4px_4px_0px_0px_black] transition duration-200 ease-out hover:opacity-90 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          Them
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}
