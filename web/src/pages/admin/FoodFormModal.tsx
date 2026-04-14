import { useEffect, useState } from "react";
import type { FoodCategory } from "../../types";

export type FoodItemForm = {
  id?: number;
  name: string;
  description: string;
  price: number;
  category: FoodCategory;
  available: boolean;
};

type Props = {
  open: boolean;
  initialData?: FoodItemForm | null;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (data: FoodItemForm) => Promise<void> | void;
};

const defaultForm: FoodItemForm = {
  name: "",
  description: "",
  price: 0,
  category: "DO_AN",
  available: true,
};

export default function FoodFormModal({
  open,
  initialData,
  loading = false,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<FoodItemForm>(defaultForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setForm(
        initialData
          ? {
              id: initialData.id,
              name: initialData.name ?? "",
              description: initialData.description ?? "",
              price: initialData.price ?? 0,
              category: initialData.category ?? "DO_AN",
              available: initialData.available ?? true,
            }
          : defaultForm,
      );
      setError("");
    }
  }, [open, initialData]);

  if (!open) return null;

  const handleChange = (
    field: keyof FoodItemForm,
    value: string | number | boolean,
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setError("Ten mon khong duoc de trong.");
      return;
    }

    if (Number(form.price) < 0) {
      setError("Gia mon khong hop le.");
      return;
    }

    setError("");
    await onSubmit({
      ...form,
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
      <div className="w-full max-w-2xl border-4 border-black bg-white shadow-[8px_8px_0px_0px_black]">
        <div className="border-b-4 border-black bg-[#1040C0] px-5 py-4 text-white">
          <p className="text-xs font-bold uppercase tracking-[0.35em]">
            Admin · Food Service
          </p>
          <h2 className="mt-2 text-3xl font-black uppercase leading-none tracking-tight">
            {initialData ? "Sua Mon An" : "Them Mon An"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-5 lg:p-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.25em]">
                Ten mon
              </label>
              <input
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full border-2 border-black bg-[#F0F0F0] px-4 py-3 outline-none"
                placeholder="Nhap ten mon"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.25em]">
                Mo ta
              </label>
              <textarea
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="min-h-[110px] w-full border-2 border-black bg-[#F0F0F0] px-4 py-3 outline-none"
                placeholder="Nhap mo ta"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.25em]">
                Gia
              </label>
              <input
                type="number"
                min={0}
                value={form.price}
                onChange={(e) => handleChange("price", Number(e.target.value))}
                className="w-full border-2 border-black bg-[#F0F0F0] px-4 py-3 outline-none"
                placeholder="35000"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.25em]">
                Loai
              </label>
              <select
                value={form.category}
                onChange={(e) =>
                  handleChange("category", e.target.value as FoodCategory)
                }
                className="w-full border-2 border-black bg-[#F0F0F0] px-4 py-3 outline-none"
              >
                <option value="DO_AN">Do an</option>
                <option value="NUOC_UONG">Nuoc uong</option>
                <option value="KHAC">Khac</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center justify-between border-2 border-black bg-[#F0C020] px-4 py-4 font-bold uppercase tracking-[0.15em]">
                Dang ban
                <button
                  type="button"
                  onClick={() => handleChange("available", !form.available)}
                  className={`relative h-8 w-16 border-2 border-black ${
                    form.available ? "bg-[#1040C0]" : "bg-white"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-6 w-6 border-2 border-black bg-[#D02020] transition ${
                      form.available ? "left-8" : "left-0.5"
                    }`}
                  />
                </button>
              </label>
            </div>
          </div>

          {error ? (
            <div className="border-2 border-black bg-[#F0C020] px-4 py-3 text-sm font-bold uppercase tracking-[0.15em] text-black">
              {error}
            </div>
          ) : null}

          <div className="flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="border-2 border-black bg-white px-4 py-3 text-sm font-bold uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_black]"
            >
              Huy
            </button>

            <button
              type="submit"
              disabled={loading}
              className="border-2 border-black bg-[#D02020] px-4 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-[4px_4px_0px_0px_black] disabled:opacity-60"
            >
              {loading
                ? "Dang xu ly..."
                : initialData
                ? "Cap nhat mon"
                : "Them mon"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}