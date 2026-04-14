import { useEffect, useState } from "react";
import PageTitle from "../../components/common/PageTitle";
import Pagination from "../../components/common/Pagination";
import StatusBadge from "../../components/common/StatusBadge";
import TableShell from "../../components/common/TableShell";
import { currency } from "../../lib/utils";
import api from "../../lib/axios";
import type { FoodCategory } from "../../types";
import type { FoodItemForm } from "./FoodFormModal";
import FoodFormModal from "./FoodFormModal";

type FoodItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: FoodCategory;
  available: boolean;
};

type PageResponse<T> = {
  content: T[];
  totalPages: number;
  totalElements: number;
  number?: number;
  size?: number;
};

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export default function AdminFoodsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<FoodCategory | "ALL">("ALL");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodItem | null>(null);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      setError("");

      const params: Record<string, string | number | boolean> = {
        page: page - 1,
        size: pageSize,
      };

      if (search.trim()) {
        params.keyword = search.trim();
      }

      if (category !== "ALL") {
        params.category = category;
      }

      if (onlyAvailable) {
        params.available = true;
      }

      const response = await api.get<ApiResponse<PageResponse<FoodItem>>>(
        "/foods",
        { params },
      );

      const payload = response.data.data;
      setFoods(payload.content ?? []);
      setTotalPages(Math.max(payload.totalPages ?? 1, 1));
      setTotalElements(payload.totalElements ?? 0);
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Khong the tai danh sach mon an.";
      setError(message);
      setFoods([]);
      setTotalPages(1);
      setTotalElements(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, [page, category, onlyAvailable]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPage(1);
      fetchFoods();
    }, 400);

    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [category, onlyAvailable]);

  const openCreateModal = () => {
    setEditingFood(null);
    setModalOpen(true);
    setError("");
    setSuccessMessage("");
  };

  const openEditModal = (food: FoodItem) => {
    setEditingFood(food);
    setModalOpen(true);
    setError("");
    setSuccessMessage("");
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingFood(null);
  };

  const handleSubmitFood = async (data: FoodItemForm) => {
    try {
      setSubmitLoading(true);
      setError("");
      setSuccessMessage("");

      const requestBody = {
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        available: data.available,
      };

      if (editingFood) {
        const response = await api.put<ApiResponse<FoodItem>>(
          `/foods/${editingFood.id}`,
          requestBody,
        );
        setSuccessMessage(response.data.message || "Cap nhat mon an thanh cong");
      } else {
        const response = await api.post<ApiResponse<FoodItem>>(
          "/foods",
          requestBody,
        );
        setSuccessMessage(response.data.message || "Them mon an thanh cong");
      }

      closeModal();
      await fetchFoods();
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        (editingFood
          ? "Cap nhat mon an that bai."
          : "Them mon an that bai.");
      setError(message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Ban co chac chan muon xoa mon an nay?");
    if (!confirmed) return;

    try {
      setError("");
      setSuccessMessage("");

      const response = await api.delete<ApiResponse<null>>(`/foods/${id}`);
      setSuccessMessage(response.data.message || "Xoa mon an thanh cong");

      if (foods.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        await fetchFoods();
      }
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Xoa mon an that bai.";
      setError(message);
    }
  };

  const handleToggleAvailable = async (food: FoodItem) => {
    try {
      setError("");
      setSuccessMessage("");

      const response = await api.put<ApiResponse<FoodItem>>(
        `/foods/${food.id}`,
        {
          name: food.name,
          description: food.description,
          price: food.price,
          category: food.category,
          available: !food.available,
        },
      );

      setSuccessMessage(
        response.data.message ||
          `Cap nhat trang thai mon ${food.name} thanh cong`,
      );

      await fetchFoods();
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Cap nhat trang thai that bai.";
      setError(message);
    }
  };

  return (
    <div className="space-y-8">
      <PageTitle
        eyebrow="ADMIN · FOOD SERVICE"
        title="QUAN LY MON AN"
        description="THEM, SUA, XOA, TIM KIEM, FILTER LOAI VA BAT TAT KHA NANG DAT MON TREN CUNG MOT TRANG."
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_220px_220px_220px]">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tim theo ten mon"
          className="border-2 border-black bg-white px-4 py-4 font-bold uppercase tracking-[0.15em] outline-none shadow-[4px_4px_0px_0px_black]"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as FoodCategory | "ALL")}
          className="border-2 border-black bg-white px-4 py-4 font-bold uppercase tracking-[0.15em] outline-none shadow-[4px_4px_0px_0px_black]"
        >
          <option value="ALL">Tat ca loai</option>
          <option value="DO_AN">Do an</option>
          <option value="NUOC_UONG">Nuoc uong</option>
          <option value="KHAC">Khac</option>
        </select>

        <label className="flex items-center justify-between border-2 border-black bg-[#F0C020] px-4 py-4 font-bold uppercase tracking-[0.15em] shadow-[4px_4px_0px_0px_black]">
          Chi mon dang ban
          <button
            type="button"
            onClick={() => setOnlyAvailable((prev) => !prev)}
            className={`relative h-8 w-16 border-2 border-black ${
              onlyAvailable ? "bg-[#1040C0]" : "bg-white"
            }`}
          >
            <span
              className={`absolute top-0.5 h-6 w-6 border-2 border-black bg-[#D02020] transition ${
                onlyAvailable ? "left-8" : "left-0.5"
              }`}
            />
          </button>
        </label>

        <button
          type="button"
          onClick={openCreateModal}
          className="border-2 border-black bg-[#D02020] px-4 py-4 font-bold uppercase tracking-[0.15em] text-white shadow-[4px_4px_0px_0px_black]"
        >
          Them Mon
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={fetchFoods}
          disabled={loading}
          className="border-2 border-black bg-[#1040C0] px-4 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white shadow-[4px_4px_0px_0px_black] disabled:opacity-60"
        >
          {loading ? "Dang tai..." : "Tai lai"}
        </button>

        <div className="border-2 border-black bg-white px-4 py-3 text-sm font-bold uppercase tracking-[0.15em] shadow-[4px_4px_0px_0px_black]">
          Tong: {totalElements} mon
        </div>
      </div>

      {error ? (
        <div className="border-2 border-black bg-[#F0C020] px-4 py-3 text-sm font-bold uppercase tracking-[0.15em] text-black shadow-[4px_4px_0px_0px_black]">
          {error}
        </div>
      ) : null}

      {successMessage ? (
        <div className="border-2 border-black bg-white px-4 py-3 text-sm font-bold uppercase tracking-[0.15em] text-[#1040C0] shadow-[4px_4px_0px_0px_black]">
          {successMessage}
        </div>
      ) : null}

      <TableShell>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-[#1040C0] text-white">
              <tr>
                {[
                  "Ten mon",
                  "Loai",
                  "Gia",
                  "Trang thai",
                  "Hanh dong",
                ].map((h) => (
                  <th
                    key={h}
                    className="border-b-4 border-black px-4 py-4 text-left text-xs font-bold uppercase tracking-[0.25em]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr className="border-t-2 border-black bg-white">
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-sm font-bold uppercase tracking-[0.2em]"
                  >
                    Dang tai du lieu...
                  </td>
                </tr>
              ) : foods.length === 0 ? (
                <tr className="border-t-2 border-black bg-white">
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-sm font-bold uppercase tracking-[0.2em]"
                  >
                    Khong co mon an nao.
                  </td>
                </tr>
              ) : (
                foods.map((food) => (
                  <tr key={food.id} className="border-t-2 border-black bg-white">
                    <td className="px-4 py-4">
                      <div className="font-black uppercase tracking-tight">
                        {food.name}
                      </div>
                      <div className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-black/60">
                        {food.description}
                      </div>
                    </td>

                    <td className="px-4 py-4 text-sm font-bold uppercase tracking-[0.2em]">
                      {food.category}
                    </td>

                    <td className="px-4 py-4 text-sm font-black uppercase tracking-tight">
                      {currency(food.price)}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <StatusBadge available={food.available} />
                        <button
                          type="button"
                          onClick={() => handleToggleAvailable(food)}
                          className="border-2 border-black bg-[#F0C020] px-3 py-2 text-xs font-bold uppercase tracking-[0.2em]"
                        >
                          {food.available ? "Tat Ban" : "Mo Ban"}
                        </button>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(food)}
                          className="border-2 border-black bg-[#F0C020] px-3 py-2 text-xs font-bold uppercase tracking-[0.2em]"
                        >
                          Sua
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(food.id)}
                          className="border-2 border-black bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.2em]"
                        >
                          Xoa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </TableShell>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />

      <FoodFormModal
        open={modalOpen}
        initialData={editingFood}
        loading={submitLoading}
        onClose={closeModal}
        onSubmit={handleSubmitFood}
      />
    </div>
  );
}